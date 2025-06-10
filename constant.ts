import cookd from 'public/images/home/cookd.png';
import fueld from 'public/images/home/fueld.png';
import suppd from 'public/images/home/suppd.png';
import shaped from 'public/images/home/shaped.png';
import subscription from 'public/images/home/subscription.png';
import tracking from 'public/images/home/tracking.png';
import cookdBanner from 'public/images/shared/cookd.png';
import cookdtitleBanner from 'public/images/shared/cookdbanner.png';
import fueldTitleBanner from 'public/images/shared/fuledtitlebanner.png';
import fueldBanner from 'public/images/shared/fueld.png';

export const selectCategories = [
  {
    img: cookd,
    name: 'cookd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
    path: 'cookd',
  },
  {
    img: fueld,
    name: 'fueld',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
    path: 'fueld',
  },
  {
    path: 'fueld',
    img: suppd,
    name: 'suppd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
  },
  {
    path: 'fueld',
    img: shaped,
    name: 'shaped',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
  },
  {
    path: 'fueld',
    img: subscription,
    name: 'subscription',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
  },
  {
    path: 'fueld',
    img: tracking,
    name: 'tracking',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/[product]',
  },
];

export const selectedItems = [
  {
    name: 'cookd',
    title: 'Waar smaak en versheid samenkomen.',
    img: cookdBanner,
    redirect: '',
    titleBanner: cookdtitleBanner,
    titleBannerWidth: 124,
    titleBannerHeight: 40,
    subtitle: 'How Do You Want to Enjoy Cook’d?',
  },
  {
    name: 'fueld',
    title: 'Eiwitrijke, prestatiegerichte maaltijden voor optimale resultaten',
    img: fueldBanner,
    redirect: '',
    titleBanner: fueldTitleBanner,
    titleBannerWidth: 94,
    titleBannerHeight: 40,
    subtitle: 'How Do You Want to Enjoy  Fuel’d?',
  },
];
