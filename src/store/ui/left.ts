import { LeftColumnContent } from '@modules/chat/sidebar/helpers/enum'
import { makeAutoObservable } from 'mobx'

export enum ContentGroup {
  Settings,
  Main,
  NewConversation
}
export class LeftColumnUiStore {
  public content: LeftColumnContent
  constructor() {
    this.content = LeftColumnContent.Conversations
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public get contentGroup(): ContentGroup {
    switch (this.content) {
      case LeftColumnContent.NewConversationStep1:
      case LeftColumnContent.NewConversationStep2:
        return ContentGroup.NewConversation

      case LeftColumnContent.Settings:
        return ContentGroup.Settings

      default:
        return ContentGroup.Main
    }
  }
  public get contentName(): string {
    return LeftColumnContent[this.content]
  }

  public handleResetContent(): void {
    console.log('[OLD CONTENT]:', LeftColumnContent[this.content])
    switch (this.content) {
      case LeftColumnContent.NewConversationStep2:
        this.setContent(LeftColumnContent.NewConversationStep1)
        break

      case LeftColumnContent.NewConversationStep1:
      case LeftColumnContent.GlobalSearch:
      case LeftColumnContent.Settings:
      case LeftColumnContent.Contacts:
        this.setContent(LeftColumnContent.Conversations)
        break

      case LeftColumnContent.Conversations:
        this.setContent(LeftColumnContent.GlobalSearch)
        break
    }
  }
  public setContent(c: LeftColumnContent): void {
    console.log('[NEW CONTENT]:', LeftColumnContent[c])

    this.content = c
  }
}
