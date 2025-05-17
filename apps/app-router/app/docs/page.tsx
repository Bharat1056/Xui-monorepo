'use client'
import React from 'react'
import AccountDocs from '@/components/account-docs'
import ButtonDocs from '@/components/button-doc'
import CardDocs from '@/components/card-docs'
import InputDocs from '@/components/input-docs'
import Installation from '@/components/installation'
import Introduction from '@/components/introduction'
import Sidebar from '@/components/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'

const contentComponents = {
  introduction: Introduction,
  installation: Installation,
  button: ButtonDocs,
  card: CardDocs,
  input: InputDocs,
  account: AccountDocs
}

const sidebarItems = [
  {
    id: 'Getting Started',
    title: 'Getting Started',
    onClick: () => console.log('Dashboard clicked'),
    subHeadings: [
      {
        id: 'introduction',
        title: 'Introduction',
        onClick: () => console.log('Introduction clicked')
      },
      {
        id: 'installation',
        title: 'Installation',
        onClick: () => console.log('Installation clicked')
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    onClick: () => console.log('Components clicked'),
    subHeadings: [
      {
        id: 'button',
        title: 'Button',
        onClick: () => console.log('Active projects clicked')
      },
      {
        id: 'card',
        title: 'Card',
        onClick: () => console.log('Archived projects clicked')
      },
      {
        id: 'input',
        title: 'Input',
        onClick: () => console.log('Completed projects clicked')
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    onClick: () => console.log('Settings clicked'),
    subHeadings: [
      {
        id: 'account',
        title: 'Account Settings',
        onClick: () => console.log('Account settings clicked')
      }
    ]
  }
]

const Page = () => {
  const [activeItem, setActiveItem] = React.useState('introduction')

  const itemsWithHandlers = sidebarItems.map(item => ({
    ...item,
    onClick: () => {
      console.log(`${item.title} clicked`)
      setActiveItem(item.id)
    },
    subHeadings: item.subHeadings?.map(subItem => ({
      ...subItem,
      onClick: () => {
        console.log(`${subItem.title} clicked`)
        setActiveItem(subItem.id)
      }
    }))
  }))

  const getActiveItemDetails = () => {
    const mainItem = sidebarItems.find(item => item.id === activeItem)
    if (mainItem) return { parent: null, title: mainItem.title }

    for (const item of sidebarItems) {
      const subItem = item.subHeadings?.find(sub => sub.id === activeItem)
      if (subItem) return { parent: item.title, title: subItem.title }
    }

    return { parent: null, title: activeItem }
  }

  const { parent, title } = getActiveItemDetails()

  const ContentComponent = (contentComponents as Record<string, () => React.ReactNode>)[activeItem] || (() => (
    <div className="prose dark:prose-invert">
      <h1>Page Not Found</h1>
      <p>The documentation for this item is not available.</p>
    </div>
  ))

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar
        items={itemsWithHandlers}
        activeItemId={activeItem}
        className="h-full"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 overflow-y-auto h-full">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <a href="/docs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  Docs
                </a>
              </li>
              {parent && (
                <li>
                  <div className="flex items-center justify-center">
                    <svg className="w-3 h-3 mx-1 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-sm font-medium text-muted-foreground ml-1">{parent}</span>
                  </div>
                </li>
              )}
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mx-1 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-sm font-medium text-foreground ml-1">{title}</span>
                </div>
              </li>
            </ol>
          </nav>
          <div className="mt-4 h-[calc(100vh-150px)] overflow-y-auto border rounded-md">
            <ScrollArea className="h-full">
              <ContentComponent />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
