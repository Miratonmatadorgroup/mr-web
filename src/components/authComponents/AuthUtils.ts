export const dashbOardTransactions = [
       {
        date:'Mar 20, 2024',
        type:'electricity token',
        amount:'₦ 5,000',
        method:'wallet',
        status:'successful',
       },
       {
        date:'Mar 21, 2024',
        type:'wallet funding',
        amount:'₦ 20,000',
        method:'card payment',
        status:'pending',
       },
       {
        date:'Mar 21, 2024',
        type:'electricity token',
        amount:'₦ 7,000',
        method:'wallet',
        status:'pending',
       },
       {
        date:'Mar 20, 2024',
        type:'electricity token',
        amount:'₦ 7,000',
        method:'wallet',
        status:'failed',
       },
       {
        date:'Mar 20, 2024',
        type:'wallet funding',
        amount:'₦ 10,000',
        method:'bank transfer',
        status:'successful',
       },
]


export const UserProfileNotifications = [
       {
              title:'Transaction Receipts',
              desc:'Receive receipts for all transactions',
              allowed:true
       },
       {
              title:'Wallet Funding',
              desc:'Get notified when your wallet is funded',
              allowed:true
       },
       {
              title:'Token Generation',
              desc:'Receive tokens via email',
              allowed:true
       }
]
export const UserProfileSms = [
       {
              title:'Transaction Alerts',
              desc:'Get SMS alerts for transactions',
              allowed:false
       },
       {
              title:'Token Delivery',
              desc:'Receive tokens via SMS',
              allowed:true
       }
]

export const UserProfileWhatsapp = [
       {
              title:'Transaction Alerts',
              desc:'Get whatsapp alerts for transactions',
              allowed:false
       },
       {
              title:'Token Delivery',
              desc:'Receive tokens via Whatsapp',
              allowed:true
       }
]

export const UserPrivacySharing = [
       {
              title:'Share usage data with estate management',
              desc:"Allow your utility usage data to be shared with estate management for better service",
              allowed:true

       },
       {
              title:'Share contact information with service providers',
              desc:"Allow service providers to contact you directly for maintenance",
              allowed:true

       },
]
export const UserPrivacyVisibility = [
       {
              title:'Show my profile to other residents',
              desc:"Allow other residents in your estate to see your basic profile information",
              allowed:false
       },
       {
              title:'Show payment history to estate management',
              desc:"Allow estate management to view your payment history",
              allowed:true
       },
]