'use client'

import React, { useContext } from 'react'
import { Avatar, Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiEdit, BiMessageDetail } from 'react-icons/bi'
import { RiRobot2Line } from 'react-icons/ri'
import ChatContext from './chatContext'

import './index.scss'

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
    onOpenPersonaPanel,
    onToggleSidebar
  } = useContext(ChatContext)

  return (
    <Flex direction="column" className={clsx('chat-side-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Box
          width="auto"
          onClick={() => {
            onCreateChat?.(DefaultPersonas[0])
            onToggleSidebar?.()
          }}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <Avatar fallback={<BiEdit className="size-6" />} />
          <Text>New Chat</Text>
        </Box>
        <ScrollArea className="flex-1 " style={{ width: '100%' }} type="auto">
          <Flex direction="column" gap="3">
            {chatList.map((chat) => (
              <Box
                key={chat.id}
                width="auto"
                className={clsx('bg-token-surface active:scale-95 truncate cursor-pointer', {
                  active: currentChatRef?.current?.id === chat.id
                })}
                onClick={() => {
                  onChangeChat?.(chat)
                  onToggleSidebar?.()
                }}
              >
                <Flex gap="2" align="center" className="overflow-hidden whitespace-nowrap">
                  <BiMessageDetail className="size-4" />
                  <Text as="p" className="truncate">
                    {chat.persona?.name}
                  </Text>
                </Flex>
                <IconButton
                  size="2"
                  className="cursor-pointer"
                  variant="ghost"
                  color="gray"
                  radius="full"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat?.(chat)
                  }}
                >
                  <AiOutlineCloseCircle className="size-4" />
                </IconButton>
              </Box>
            ))}
          </Flex>
        </ScrollArea>
        <Box
          width="auto"
          onClick={() => onOpenPersonaPanel?.('chat')}
          className="bg-token-surface-primary active:scale-95 cursor-pointer"
        >
          <RiRobot2Line className="size-4" />
          <Text>Persona Store</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default ChatSideBar
