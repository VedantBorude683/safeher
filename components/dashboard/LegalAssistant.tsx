'use client'

import { useState } from 'react'
import { Send, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
}

const qaDatabase: { [key: string]: string } = {
  'How do I file an FIR?': `To file an FIR (First Information Report):
1. Visit the nearest police station
2. Speak to the duty officer or station in-charge
3. Provide all relevant details about the incident
4. The police will record your statement
5. Keep the FIR number for future reference
6. You can also file online through cybercrime.gov.in for cyber cases`,

  'What is Section 498A?': `Section 498A of the Indian Penal Code addresses "Cruelty by Husband or His Relatives":
- This section protects married women from cruelty
- Cruelty includes physical abuse, mental torture, and harassment
- This is a non-cognizable offense (police need permission to arrest)
- Punishment can be up to 3 years imprisonment and/or fine
- This is one of the most commonly used sections in domestic violence cases`,

  'How to report cyber harassment?': `Steps to report cyber harassment:
1. Document all evidence (screenshots, messages, etc.)
2. File a complaint at cybercrime.gov.in
3. Visit your nearest police station (cyber cell)
4. You can also file an online FIR
5. Provide all relevant details and evidence
6. For immediate help, contact: 1930 (Cyber Crime Helpline)`,

  'What are my rights if arrested?': `Your constitutional rights when arrested:
1. Right to know the reason for arrest
2. Right to remain silent (don't answer without lawyer)
3. Right to contact a lawyer
4. Right to legal aid if you can't afford a lawyer
5. Right to medical examination
6. Police must produce you before a magistrate within 24 hours
7. No torture or third-degree methods are allowed`,

  'How to contact One Stop Centre?': `One Stop Centres provide integrated support for women:
- Available in every district
- Services include: medical, legal, police, counseling
- Free and confidential services
- Can be accessed without filing a case first
- Pune OSC: Available 24/7
- Phone: Check government website for local numbers
- They can help with emergency shelter, medical care, and legal advice`,
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
      text: 'Hello! I am SafeHer AI Legal Assistant. Ask me about your rights, filing reports, cyber laws, and emergency support.',
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
      const response = qaDatabase[messageText] || `I’m not sure about that. Please try asking about:
- How to file an FIR
- Section 498A
- Cyber harassment reporting
- Your rights when arrested
- One Stop Centre services

If this is urgent, contact local authorities or emergency hotlines.`
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] pb-24 md:pb-0">
      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Legal Assistant</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">AI legal support</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              Get guidance on police reports, legal rights, and emergency service options anytime.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[2rem] bg-[#0E1020] px-5 py-4 border border-[#2E2E48]">
            <MessageCircle className="w-6 h-6 text-[#7C3AED]" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Fast answers</p>
              <p className="text-sm font-semibold text-white">Legal tips and rights support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-[2rem] border border-[#1E1E35] bg-[#12121F] shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="flex h-full flex-col md:flex-row">
          <aside className="w-full md:w-[320px] border-b border-[#1E1E35] md:border-b-0 md:border-r bg-[#11121F] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Popular topics</p>
            <div className="mt-4 space-y-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full rounded-[1.5rem] border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-left text-sm text-[#F1F5F9] transition hover:border-[#7C3AED]"
                >
                  {question}
                </button>
              ))}
            </div>
          </aside>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[90%] rounded-[1.75rem] px-5 py-4 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white rounded-br-none'
                        : 'bg-[#0D1020] border border-[#1E1E35] text-[#F1F5F9] rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-6">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-[1.75rem] bg-[#0D1020] border border-[#1E1E35] px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#7C3AED] animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-[#7C3AED] animate-bounce" style="animation-delay:0.2s" />
                      <span className="h-2 w-2 rounded-full bg-[#7C3AED] animate-bounce" style="animation-delay:0.4s" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#1E1E35] p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a legal question..."
                  className="flex-1 rounded-[1.5rem] border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#7C3AED]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !inputValue.trim()}
                  className="inline-flex items-center gap-2 rounded-[1.5rem] bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
