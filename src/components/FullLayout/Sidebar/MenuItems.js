import { HomeTwoTone, ExitToApp, ErrorTwoTone, AccountCircleTwoTone, BallotTwoTone} from '@material-ui/icons';

const MenuItems = [
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
      href: 'services',
      icon: BallotTwoTone,
      title: 'Services'
    },
    {
      href: 'Users',
      icon: AccountCircleTwoTone,
      title: 'Users'
    },
    {
      href: 'chart',
      icon: ErrorTwoTone,
      title: 'Chart'
    },
    {
      href: 'logout',
      icon: ExitToApp,
      title: 'Logout'
    }
 
 ];

 export default MenuItems;