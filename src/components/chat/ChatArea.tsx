import { useState, useRef, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: number
  text: string
  isUser: boolean
}

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'سلام! من یک دستیار هوشمند هستم که به اطلاعات لحظه‌ای بورس ایران دسترسی دارم. چطور می‌توانم کمکتان کنم؟',
      isUser: false,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response,
        isUser: false,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error fetching chat response:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'متاسفانه در ارتباط با سرور مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.isUser ? 'justify-end' : 'justify-start'
              )}
            >
              {!message.isUser && (
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Bot" />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 text-sm',
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
              </div>
              {message.isUser && (
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Bot" />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm">
                    <p>در حال نوشتن...</p>
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="pr-16"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isLoading}
          />
          <Button
            className="absolute top-1/2 -translate-y-1/2 right-3"
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
