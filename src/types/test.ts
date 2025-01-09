{
  "bookingAgentId": 25225,
  "staffId": 44692,
  "clientReference": "Test",
  "confirm": true,
  "invoice": {
  "invoiceTo": 2,
    "agentId": 25225,
    "clientId": null,
    "client": null,
    "payment": {
    "type": 2,
      "creditCardId": null
  }
},
  "services": [
  {
    "type": "quote",
    "serviceDescription": "Transfer from airport  BCN",
    "passenger": {
      "id": 152932,
      "name": "oriol",
      "phone": 34639097088
    },
    "pax": 2,
    "flights": {
      "pickup": "TL1234",
      "dropoff": null
    },
    "fbo": {
      "pickup": {
        "id": 4781,
        "name": "EXECUJET EUROPE",
        "phone": null,
        "iata": "BCN"
      },
      "dropoff": null
    },
    "comments": "",
    "brokerCommission": 0,
    "childseats": 1,
    "boosters": 0,
    "serviceID": "PR80086253834303018600252672446204",
    "vehicleID": "V37060380483206661702723173864628",
    "contacts": [
      {
        "name": "Albert Straush",
        "phone": "79121234567",
        "email": "astraush@driv.com",
        "position": "",
        "recipient": "to",
        "permissions": [
          {
            "BookingQuotation": {
              "email": true,
              "sms": false
            }
          },
          {
            "BookingConfirmation": {
              "email": true,
              "sms": false
            }
          },
          {
            "BookingConfirmationChange": {
              "email": true,
              "sms": false
            }
          },
          {
            "BookingPriceRequest": {
              "email": true,
              "sms": false
            }
          },
          {
            "BookingCancellation": {
              "email": true,
              "sms": false
            }
          },
          {
            "BookingChauffeurDetail": {
              "email": true,
              "sms": true
            }
          },
          {
            "OnMyWay": {
              "email": true,
              "sms": true
            }
          },
          {
            "DriverOnLocation": {
              "email": true,
              "sms": true
            }
          },
          {
            "PassengerOnBoard": {
              "email": true,
              "sms": true
            }
          },
          {
            "DropOff": {
              "email": true,
              "sms": true
            }
          },
          {
            "EtaUpdate": {
              "email": true,
              "sms": true
            }
          },
          {
            "SendInvoice": {
              "email": true,
              "sms": false
            }
          }
        ]
      },
      {
        "name": "oriol",
        "phone": "34639097088",
        "email": "",
        "position": "",
        "recipient": "to",
        "permissions": [
          {
            "BookingChauffeurDetail": {
              "email": false,
              "sms": true
            }
          },
          {
            "OnMyWay": {
              "email": false,
              "sms": false
            }
          },
          {
            "DriverOnLocation": {
              "email": false,
              "sms": true
            }
          },
          {
            "PassengerOnBoard": {
              "email": false,
              "sms": false
            }
          },
          {
            "EtaUpdate": {
              "email": false,
              "sms": false
            }
          },
          {
            "DropOff": {
              "email": false,
              "sms": false
            }
          },
          {
            "SendInvoice": {
              "email": false,
              "sms": false
            }
          }
        ]
      }
    ]
  }
],
  "ipClient": "10.12.7.126",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "salesPlatform": 8
}