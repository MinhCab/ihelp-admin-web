import { HomeTwoTone, AccountCircleTwoTone, BallotTwoTone, Report } from '@material-ui/icons';

const MenuItemsForAdmin = [
    {
      href: '/home/dashboard',
      icon: HomeTwoTone,
      title: 'Dashboard'  
    },
    {
      href: '/home/events',
      icon: BallotTwoTone,
      title: 'Events'
    },
    {
      href: '/home/services',
      icon: BallotTwoTone,
      title: 'Services'
    },
    {
      href: '/home/users',
      icon: AccountCircleTwoTone,
      title: 'Users'
    },
    {
      href: '/home/reports',
      icon: Report,
      title: 'Reports'
    },
 ];

 const MenuItemsForManager = [
  {
    href: '/home/dashboard',
    icon: HomeTwoTone,
    title: 'Dashboard'  
  },
  {
    href: '/home/events',
    icon: BallotTwoTone,
    title: 'Events'
  },
  {
    href: '/home/services',
    icon: BallotTwoTone,
    title: 'Services'
  },
];

 export { MenuItemsForAdmin, MenuItemsForManager };