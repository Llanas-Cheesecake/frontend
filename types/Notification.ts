export interface Notification {
  id: number
  content: string
  link?: string
  is_unread: boolean
  is_sent: boolean
  created_at: string
  updated_at: string
}