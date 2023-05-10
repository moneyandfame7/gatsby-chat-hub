import moment from 'moment'

export const hasWindow = () => typeof window !== 'undefined'

export const formatDate = (date: Date) => {
  const momentDate = moment(date)
  /*  */
  // Якщо це сьогодні -  13:22
  if (momentDate.isSame(moment(), 'day')) {
    return momentDate.format('HH:mm')
  }
  // Якщо це вчора або весь поточний тиждень - Sat, Wed, etc
  else if (momentDate.isSame(moment().startOf('week'), 'day') || momentDate.isAfter(moment().startOf('week'))) {
    return momentDate.format('ddd')
  }
  // Якщо це минулий тиждень і пізніше - Apr 3, Feb 24
  else {
    return momentDate.format('MMM D')
  }
}
