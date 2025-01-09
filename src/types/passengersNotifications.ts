//passengers notifications
export interface PassengersNotifications {
  name: string
  phone: string
  email: string
  leadPassenger: boolean
  preBoarding: {
    chauffeurContactDetails: typeOfNotification
    chauffeurOnTheWay: typeOfNotification
    chauffeurOnLocation: typeOfNotification
  }
  onRoute: {
    passengerOnBoard: typeOfNotification
    etaAtDropOff: typeOfNotification
    passengerDroppedOff: typeOfNotification
  }
}

export interface typeOfNotification {
  email: boolean
  sms: boolean
}
