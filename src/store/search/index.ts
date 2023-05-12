class SearchStore {
  private queryGlobalResult: any

  public searchByQueryGlobal = (query: string) => {
    /* const {data}=useMutation() */
    /* this.queryGlobalResult=data..... */
  }

  public searchByContacts = (contact: string) => {
    /* contacts here */
    /* this.contacts=... */
  }
  public getContacts = (contact: string) => {
    /* by default, return from cache */
    /* contacts or No contacts matched your search. */
  }

  public getQueryGlobalResult = () => {
    /* messages, chats, contacts */
  }
}

export const search = new SearchStore()
