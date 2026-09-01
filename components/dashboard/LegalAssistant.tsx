'use client'

import { useState } from 'react'
import { Send, Scale, MessageSquare, Bot, User, CheckCircle2, Shield } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
}

const qaDatabase: { [key: string]: string } = {
  'How do I file an FIR?': `To file a First Information Report (FIR):
1. Visit your nearest police station or women police desk.
2. State the incident clearly to the duty officer.
3. The police are legally mandated under CrPC Sec 154 to register your statement without delay.
4. You are entitled to a free signed copy of the FIR immediately.
5. Online e-FIR is also available for non-heinous and cyber offenses on state police portals.`,

  'What is Section 498A?': `Section 498A of the Indian Penal Code protects women from cruelty and domestic harassment by husbands or in-laws. It covers physical, emotional, and economic abuse, and provides strong legal safeguards.`,

  'How to report cyber harassment?': `Steps to report cyber harassment:
1. Preserve evidence: Take clear screenshots with URLs, dates, and account handles.
2. File an official complaint at cybercrime.gov.in or dial National Cyber Helpline 1930.
3. You can report anonymously or request identity protection.`,

  'What are my rights if arrested?': `Key constitutional rights:
1. Female officers must be present for searches and custody procedures.
2. No woman can be arrested between sunset and sunrise except under exceptional magistrate orders.
3. Right to know grounds of arrest and notify a family member/advocate immediately.
4. Right to free legal aid if required.`,

  'How to contact One Stop Centre?': `One Stop Centres (Sakhi OSC) offer integrated medical aid, legal counseling, temporary shelter, and police support under one roof across all districts. Call Women Helpline 181 for direct referral.`,
}

const quickQuestions = [
  'How do I file an FIR?',
  'What is Section 498A?',
  'How to report cyber harassment?',
  'What are my rights if arrested?',
  'How to contact One Stop Centre?',
]

export default function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your SafeHer AI Legal & Rights Guide. Ask any questions about FIR procedures, constitutional rights, domestic protection laws, or cyber harassment support.',
      sender: 'ai',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response =
        qaDatabase[messageText] ||
        `Based on Indian legal framework guidelines, your inquiry regarding "${messageText}" can be addressed by legal counsel or by calling National Women Helpline 181. For formal police complaints, visit your district One-Stop Crisis Center or dial 112.`
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 600)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Legal Empowerment
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            AI Legal & Rights Assistant
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Instant confidential guidance on statutory rights, reporting procedures, and emergency legal remedies.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block">
            Advisory Engine
          </span>
          <span className="text-base font-bold text-[var(--primary)] mt-0.5 block">
            ✓ Indian Law Knowledge Base
          </span>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col h-[560px] justify-between">
        {/* MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-[var(--primary)] flex items-center justify-center shrink-0 mt-1">
                  <Scale size={16} />
                </div>
              )}
              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[var(--primary)] text-white font-medium rounded-tr-xs shadow-xs'
                    : 'bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-xs text-[var(--text-muted)]">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-ghost)] text-[var(--primary)] flex items-center justify-center shrink-0">
                <Scale size={16} />
              </div>
              <span className="animate-pulse">Analyzing legal statutes...</span>
            </div>
          )}
        </div>

        {/* QUICK QUESTION PILLS & INPUT */}
        <div className="pt-4 border-t border-[var(--border)] space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] shrink-0">Quick Queries:</span>
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1 rounded-full bg-[var(--bg-base)] hover:bg-[var(--accent-ghost)] hover:text-[var(--primary)] border border-[var(--border)] text-xs text-[var(--text-secondary)] shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask any question about women's rights, filing an FIR, or legal steps..."
              className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-3 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white disabled:opacity-40 transition-opacity"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
