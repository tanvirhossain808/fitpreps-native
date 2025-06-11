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
import food from 'public/images/food.png';
import { FoodOrSliderItem } from './type';
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
    price: [],
  },
  {
    type: 'food',
    id: 2,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
  },
  {
    type: 'food',
    id: 3,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
  },
  {
    type: 'food',
    id: 4,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
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
    price: [],
  },
  {
    type: 'food',
    id: 6,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
  },
  {
    type: 'food',
    id: 7,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
  },
  {
    type: 'food',
    id: 8,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: [],
  },
];
