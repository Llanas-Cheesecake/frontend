import type { Cart } from "~/types/Cart";
import type { ApiResponse } from "~/types/ApiResponse";
import { useDebounceFn } from "@vueuse/core";
import { fetchXSRFCookie } from "~/utils";

// @ts-ignore
import * as Toast from "vue-toastification/dist/index.mjs";

const { useToast } = Toast;
const toast = useToast();

export const useCartStore = defineStore('cart', () => {
    // States
    const cart = reactive<Cart>({});
    const isLoading = ref(true);
    const percentDiscount = ref(0);

    // Getters
    const _is_loading = computed(() => isLoading.value)
    const _cart_id = computed(() => cart.cart_id)

    const _items = computed(() => {
        if (percentDiscount.value === 0) return cart.items;

        return cart.items?.map((item) => {
            const discountedPrice = parseFloat(item.product.price as unknown as string) * (percentDiscount.value / 100)

            return {...item, discounted_price: item.product.price - discountedPrice}
        })
    })

    const _subtotalPrice = computed(() => {
        if (!cart.items) return 0;

        let totalPrice = 0;

        cart.items.map((item) => {
            totalPrice += (parseFloat(item.product.price as unknown as string) * item.quantity)
        });

        return totalPrice;
    });

    const _discountedPrice = computed(() => {
        if (percentDiscount.value === 0) return 0;

        return _subtotalPrice.value * (percentDiscount.value / 100)
    });

    const _totalPrice = computed(() => {
        return _subtotalPrice.value - _discountedPrice.value
    });

    const setPercentDiscount = (percent: number) => {
        percentDiscount.value = percent;
    }

    const getCartContents = async () => {
        const cartCookie = useCookie('cart_session', {
            maxAge: 31536000,
            secure: true,
            sameSite: "lax"
        })

        await fetchXSRFCookie();

        return await useFetchAPI<ApiResponse>('/cart', {
            method: 'POST',
            body: {
                cart_id: cartCookie.value || null
            },
            server: false
        }).then((res) => {
            const result = res.data.value?.data

            // Set cookie for cart_id
            cartCookie.value = result.cart.cart_id;

            cart.cart_id = result.cart.cart_id
            cart.items = result.cart.items
        }).finally(() => {
            isLoading.value = false
        })
    }

    const addToCart = async (item: {
        product_id: number,
        quantity: number,
        type: string
    }) => {
        const cartCookie = useCookie('cart_session', {
            readonly: true
        })

        // Check if item is already in the cart
        // If true, increment the quantity
        let quantityToAdd = item.quantity;
        const selectedItem = _items.value?.find(i => i.product.product_id === item.product_id)

        if (selectedItem) {
            quantityToAdd += selectedItem.quantity;
        }

        await fetchXSRFCookie()

        const result = await useFetchAPI<ApiResponse>('/cart/add', {
            method: 'POST',
            body: {
                cart_id: cartCookie.value || null,
                product_id: item.product_id,
                quantity: quantityToAdd,
                type: item.type
            },
            server: false,
            onResponseError(error): Promise<void> | void {
                // Backend returns http code 403 if selected product has no stock
                if (error.response.status === 403) {
                    toast.error(error.response._data.message)
                }
            }
        });

        if (result.status.value != "error") {
            const response = result.data.value?.data

            cart.items = response.cart.items

            toast.success("Item added to cart")
        }
    }

    const removeFromCart = async (product_id: number) => {
        const cartCookie = useCookie('cart_session', {
            readonly: true
        })

        await fetchXSRFCookie()

        const result = await useFetchAPI<ApiResponse>('/cart/remove', {
            method: 'DELETE',
            body: {
                cart_id: cartCookie.value || null,
                product_id: product_id,
            },
            server: false,
            onResponseError(error): Promise<void> | void {
                toast.error(error.response._data.message)
            }
        });

        if (result.status.value != "error") {
            const response = result.data.value?.data

            cart.items = response.cart.items

            toast.success("Item removed from cart")
        }
    }

    const removeAllItems = async () => {
        const cartCookie = useCookie('cart_session', {
            readonly: true
        })

        await fetchXSRFCookie()

        const result = await useFetchAPI<ApiResponse>('/cart/remove-all', {
            method: 'DELETE',
            body: {
                cart_id: cartCookie.value || null
            },
            server: false,
            onResponseError(error): Promise<void> | void {
                toast.error(error.response._data.message)
            }
        });

        if (result.status.value != "error") {
            const response = result.data.value?.data

            cart.items = response.cart.items

            toast.success("All items removed from cart")
        }
    }

    const updateItemQuantity = async (product_id: number, quantity: number) => {
        const item = cart.items?.find(i => i.product.product_id === product_id);
        let previousQuantity = 0;

        if (item) {
            previousQuantity = item.quantity;

            item.quantity = quantity;

            await debouncedUpdateItem(item, previousQuantity);
        }
    }

    const debouncedUpdateItem = useDebounceFn(async (item, previousQuantity) => {
        const cartCookie = useCookie('cart_session', {
            readonly: true
        })

        await fetchXSRFCookie()

        const result = await useFetchAPI<ApiResponse>('/cart/update', {
            method: 'PATCH',
            body: {
                cart_id: cartCookie.value || null,
                product_id: item.product.product_id,
                quantity: item.quantity
            },
            server: false,
            onResponseError(error): Promise<void> | void {
                toast.error(error.response._data.message)
                item.quantity = previousQuantity
            }
        });

        if (result.status.value != "error") {
            // const response = result.data.value?.data
            // cart.items = response.cart.items
            toast.success("Item updated")
        }
    }, 1000)

    const getItemTotalPrice = (product_id: number) => {
        const item = _items.value!!.find(i => i.product.product_id === product_id);

        if (!item) return 0;

        return item.quantity * (percentDiscount.value > 0 ? item.discounted_price : item.product.price);
    }

    return { _is_loading, _cart_id, _items, _subtotalPrice, _totalPrice, setPercentDiscount, getCartContents, getItemTotalPrice, addToCart, removeFromCart, removeAllItems, updateItemQuantity }
}, { persist: true })