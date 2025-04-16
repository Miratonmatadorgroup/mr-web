import enterprise from '@/assets/generalImages/enterprise.png'
import enterprise1 from '@/assets/generalImages/enterprise1.png'
import enterprise2 from '@/assets/generalImages/enterprise2.png'
import enterprise3 from '@/assets/generalImages/enterprise3.png'
import enterprise4 from '@/assets/generalImages/enterprise4.png'
import enterprise5 from '@/assets/generalImages/enterprise5.png'
import enterprise6 from '@/assets/generalImages/enterprise6.png'
import {toast}  from 'sonner'

export const MoveToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

export const ErrorMessage = (message: string | undefined) => {
  return toast.error(message, {
    position: "top-center",
    style: {
      backgroundColor: "#dc2626", 
      color: "#ffffff", 
    },
  });
};


interface Roles {
  role:string,
  url:string
}
export const UserRoles:Roles[] = [
  {
      role: 'user',
      url: '/user/dashboard'
  },
  {
      role: 'manager',
      url: '/user/dashboard'
  },
  {
      role: 'homeOwner',
      url: '/user/dashboard'
  },
  {
      role: 'admin',
      url: '/admin/dashboard'
  },
]

export const naira ='₦'
export const SuccessMessage = (message: string) => {
  return toast.success(message, {
    position: "top-center",
    style: {
      backgroundColor: "#1f502d", 
      color: "#ffffff", 
    },
  });
};

export const Corecomponents = [
  {
    title: 'Prepaid Metering & Token Vending',
    image: enterprise,
    subs: [
      'Comprehensive Metering: Sale, installation, and management of prepaid electricity, water, and gas meters for homes, estates, and businesses.',
      'Universal Token Vending: Residents and tenants can easily purchase tokens for both our meters and third-party meters via our seamless platform.',
      'Real-Time Consumption Monitoring: Users track usage, manage budgets, and avoid unexpected disconnections.'
    ]
  },
  {
    title: 'Smart Estate & Facility Management',
    image: enterprise1,
    subs: [
      'All-in-One Estate Platform: A unified system for metering, energy monitoring, access control, and diesel management — tailored for modern communities.',
      'Resident & Tenant Portals: Easy access to bills, tokens, and access permissions via mobile-friendly portals.'
    ]
  },
  {
    title: 'Access Control Systems',
    image: enterprise2,
    subs: [
      'Automated Estate Access Control: Digitally manage vehicle and pedestrian entry and exit with smart gates, license plate recognition, and facial recognition.',
      'Zero Human Intervention: Eliminate gatekeepers and manual logs — ensuring seamless, secure, and auditable entry for authorized individuals and vehicles.'
    ]
  },
  {
    title: 'Diesel Management Solutions',
    image: enterprise3,
    subs: [
      'Real-Time Diesel Monitoring: Track diesel supply, usage, and replenishment across estates and facilities.',
      'Theft Prevention & Efficiency Optimization: Prevent fuel theft and minimize waste with real-time data and automated alerts.'
    ]
  },
  {
    title: 'End-to-End Solar Energy Projects',
    image: enterprise4,
    subs: [
      'Full Lifecycle Services: From energy assessment and system design to installation, monitoring, and long-term maintenance.',
      'Premium Components: We source and install only best-in-class solar panels, inverters, and components.',
      'Expert Engineering: Our certified designers and engineers deliver high-performance systems built to last.'
    ]
  },
  {
    title: 'Substations, Transformers & Grid Infrastructure',
    image: enterprise5,
    subs: [
      'Complete Substation Projects: Supply, installation, and maintenance of substations, transformers, and supporting grid infrastructure.',
      'Grid Expansion & Upgrades: We support utilities and estates in expanding or upgrading electrical infrastructure to meet future demand.'
    ]
  },
  {
    title: 'EV Charging Network (Coming Soon)',
    image: enterprise6,
    subs: [
      'Connected Charging Network: We are building a region-wide network of EV charging stations, integrated with renewable energy sources.',
      'Future-Ready Mobility: Enabling smart estates and communities to embrace clean transportation.'
    ]
  },
]


export const ChooseUs = [
  {
    title: 'Integrated Smart Solutions',
    desc: 'From utility metering to estate management and energy infrastructure, we deliver all the technology your estate or community needs on a single platform.'
  },
  {
    title: 'End-to-End Project Expertise',
    desc: 'Whether it’s prepaid metering, solar deployment, or substation installation, we manage the complete lifecycle — from design to installation and long-term support.'
  },
  {
    title: 'Automated, Human-Free Operations',
    desc: 'Our access control systems and diesel management platforms minimize the need for human intervention — boosting efficiency, security, and cost savings.'
  },
  {
    title: 'Sustainability & Cost Optimization',
    desc: 'We help you reduce carbon footprint and energy costs with renewable solutions, real-time monitoring, and optimized diesel usage.'
  },
  {
    title: 'Technology That Works for You',
    desc: 'Our platforms are designed for both standalone deployment and seamless integration into existing estate, utility, or facility management systems.'
  },
]