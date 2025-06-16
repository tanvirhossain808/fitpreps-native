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
import AllImg from 'public/images/mealsSelector/all.png';
import bundlesImg from 'public/images/mealsSelector/bundles.png';
import chickenImg from 'public/images/mealsSelector/chicken.png';
import fishImg from 'public/images/mealsSelector/fish.png';
import beefImg from 'public/images/mealsSelector/beef.png';
import vegetarianImg from 'public/images/mealsSelector/vegetarian.png';
import accessoriesImg from 'public/images/mealsSelector/accesories.png';
import cookdBreakfast from 'public/images/mealsSelector/cookdbreakfast.png';
import foodsliderimg1 from 'public/images/slider/slider1.png';
import foodsliderimg2 from 'public/images/slider/slider2.png';
import foodsliderimg3 from 'public/images/slider/slider3.png';
import foodsliderimg4 from 'public/images/slider/slider4.png';
import extraFoodPic1 from 'public/images/extrafood/Beef teriyaki noodles.png';
import extraFoodPic2 from 'public/images/extrafood/Beef roti.png';
import food from 'public/images/food.png';
import { FoodOrSliderItem } from './type';
import { ImageSourcePropType } from 'react-native';
import barChart12 from 'public/images/subscription/bar-chart-12.svg';
import coinsStacked02 from 'public/images/subscription/coins-stacked-02.svg';
import award03 from 'public/images/subscription/award-03.svg';
import clockRewind from 'public/images/subscription/clock-rewind.svg';
import noodles from 'public/images/subscription/noodles.svg';
import target04 from 'public/images/subscription/target-04.svg';
import coin from 'public/images/coin.svg';
export const selectCategories = [
  {
    img: cookd,
    name: 'cookd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
    path: 'cookd',
  },
  {
    img: fueld,
    name: 'fueld',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
    path: 'fueld',
  },
  {
    path: 'fueld',
    img: suppd,
    name: 'suppd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect/',
  },
  {
    path: 'fueld',
    img: shaped,
    name: 'shaped',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect ',
  },
  {
    path: 'fueld',
    img: subscription,
    name: 'subscription',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
  },
  {
    path: 'fueld',
    img: tracking,
    name: 'tracking',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
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
export const cookdFoodCategories = [
  {
    name: 'All',
    img: AllImg,
    id: 1,
  },
  {
    name: 'Bundles',
    img: bundlesImg,
    id: 2,
  },
  {
    name: 'Chicken',
    img: chickenImg,
    id: 3,
  },
  {
    name: 'Beef',
    img: beefImg,
    id: 4,
  },
  {
    name: 'Fish',
    img: fishImg,
    id: 5,
  },
  {
    name: 'Vegetarian',
    img: vegetarianImg,
    id: 6,
  },
  {
    name: 'Accessories',
    img: accessoriesImg,
    id: 7,
  },
  {
    name: 'Breakfast',
    img: accessoriesImg,
    id: 8,
  },
];
export const foodSortByOptions = [
  {
    name: 'Price: Low to High',
  },
  {
    name: 'Price: High to Low',
  },
  {
    name: 'Newest to Oldest',
  },
  {
    name: 'Oldest to Newest',
  },
];
export const cookdFilter = [
  {
    name: 'price',
    filterOption: ['€0 - €10', '€10 - €20', '€20 - €50', '€50 - €100', '€100+'],
    bg: '#E5F8EA',
    border: '#009A21',
  },
  {
    name: 'Cuisine',
    filterOption: ['Italian', 'Mexican', 'Dutch', 'French', 'Spanish', 'Arabic', 'Asian', 'German'],
    bg: '#E5F8EA',
    border: '#009A21',
  },
  {
    name: 'General',
    filterOption: ['Best Seller', 'Sale', 'New'],
    bg: '#E5F8EA',
    border: '#009A21',
  },
];
export const foodOfItems: FoodOrSliderItem[] = [
  {
    type: 'food',
    id: 1,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 2,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 3,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 4,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'slider',
    id: 'slider-1',
    images: [
      {
        img: foodsliderimg1,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 1,
      },
      {
        img: foodsliderimg2,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 2,
      },
      {
        img: foodsliderimg3,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#1E1F20',
        id: 3,
      },
      {
        img: foodsliderimg4,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 4,
      },
    ],
  },
  {
    type: 'food',
    id: 5,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 6,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 7,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 8,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    // price: '€10',
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 1,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 2,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 3,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 4,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'slider',
    id: 'slider-1',
    images: [
      {
        img: foodsliderimg1,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 1,
      },
      {
        img: foodsliderimg2,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 2,
      },
      {
        img: foodsliderimg3,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#1E1F20',
        id: 3,
      },
      {
        img: foodsliderimg4,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 4,
      },
    ],
  },
  {
    type: 'food',
    id: 5,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 6,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 7,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 8,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    // price: '€10',
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 1,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 2,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 3,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 4,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'slider',
    id: 'slider-1',
    images: [
      {
        img: foodsliderimg1,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 1,
      },
      {
        img: foodsliderimg2,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 2,
      },
      {
        img: foodsliderimg3,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#1E1F20',
        id: 3,
      },
      {
        img: foodsliderimg4,
        caption: 'Up to 10% OFF',
        title: 'Subscribe & Save!',
        text: '#FFFFFF',
        id: 4,
      },
    ],
  },
  {
    type: 'food',
    id: 5,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 6,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 7,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
  {
    type: 'food',
    id: 8,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    // price: '€10',
    price: [
      {
        quantity: '300 gr',
        price: '€10',
      },
      {
        quantity: '600 gr',
        price: '€20',
      },
      {
        quantity: '1 kg',
        price: '€30',
      },
    ],
    badge: 'Asian',
  },
];

export const extraFoods: {
  name: string;
  price: number;
  img: ImageSourcePropType;
}[] = [
  {
    img: extraFoodPic1,
    price: 9,
    name: 'Beef Teriyaki Noodles',
  },
  {
    img: extraFoodPic2,
    price: 9,
    name: 'Kip Burrito',
  },
];

export const youMayLike = [
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
  {
    name: 'Stew - Mashed potatoes - Carrot mix',
    price: '€9',
    img: food,
    badge: 'Asian',
  },
];

export const address = [
  {
    name: 'Address1',
    streetName: 'Street name, Block no., Locality, City Name, State - 000000.',
    city: 'New York',
    state: 'NY',
    zip: '12345',
    apartment: '123',
    houseNo: '123',
    phone: '1234567890',
    isDefault: true,
    badge: 'Home',
  },
  {
    name: 'Address2',
    streetName: 'Street name, Block no., Locality, City Name, State - 000000.',
    city: 'New York',
    state: 'NY',
    zip: '12345',
    apartment: '123',
    houseNo: '123',
    phone: '1234567890',
    isDefault: true,
    badge: 'Home',
  },
];

export const subscriptionPlans = [
  {
    name: 'Weekly Plan',
    plans: [
      {
        name: 'Starter Pack',
        badge: 'Current',
        price: '€126',
        coins: '1260',
        bonusCoins: '120',
        id: 'weekly1',
      },
      {
        name: 'Balance Pack',
        badge: 'Current',
        price: '€252',
        coins: '2520',
        bonusCoins: '250',
        id: 'weekly2',
      },
      {
        name: 'Elite Pack',
        badge: 'Current',
        price: '€504',
        coins: '5040',
        bonusCoins: '500',
        id: 'weekly3',
      },
    ],
    save: '10',
  },
  {
    name: 'Monthly Plan',
    plans: [
      {
        name: 'Starter Pack',
        badge: 'Current',
        price: '€126',
        coins: '1660',
        bonusCoins: '120',
        id: 'monthly1',
      },
      {
        name: 'Balance Pack',
        badge: 'Current',
        price: '€252',
        coins: '2520',
        bonusCoins: '250',
        id: 'monthly2',
      },
      {
        name: 'Elite Pack',
        badge: 'Current',
        price: '€504',
        coins: '5040',
        bonusCoins: '500',
        id: 'monthly3',
      },
    ],
    save: '10',
  },

  // {
  //   name: 'Yearly',
  //   price: '€9',
  //   img: food,
  //   badge: 'Asian',
  // },
];

export const weeklyPlans = [
  {
    name: 'Quick results & flexibility',
    img: barChart12,
  },
  {
    name: 'Total 630–2520 points',
    img: coinsStacked02,
  },
  {
    name: '+60 to +250 Bonus points',
    img: award03,
  },
];
export const monthlyPlans = [
  {
    name: 'Consistency & savings',
    img: barChart12,
  },
  {
    name: 'Total 1260–5040 points',
    img: coinsStacked02,
  },
  {
    name: '+120 to +500 Bonus points',
    img: award03,
  },
];

export const subcriptionBadges = [
  {
    name: 'Each € is equivalent to 10 points',
    icon: coin,
  },
  {
    name: 'Points are added every Monday',
    icon: clockRewind,
  },
  {
    name: 'Select meals by 23:59 every Sunday',
    icon: noodles,
  },
  {
    name: 'Cancel, upgrade anytime',
    icon: target04,
  },
];
