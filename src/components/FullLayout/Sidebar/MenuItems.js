import { HomeTwoTone, ExitToApp, ErrorTwoTone, AccountCircleTwoTone, BallotTwoTone} from '@material-ui/icons';

const MenuItems = [
    {
      href: 'dashboard',
      icon: HomeTwoTone,
      title: 'Dashboard'
    },
    {
      href: 'events',
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