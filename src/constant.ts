import React, { createElement } from 'react';
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
import foodsliderimg1 from 'public/images/slider/slider1.png';
import foodsliderimg2 from 'public/images/slider/slider2.png';
import foodsliderimg3 from 'public/images/slider/slider3.png';
import foodsliderimg4 from 'public/images/slider/slider4.png';
import extraFoodPic1 from 'public/images/extrafood/Beef teriyaki noodles.png';
import extraFoodPic2 from 'public/images/extrafood/Beef roti.png';
import food from 'public/images/food.png';
import { FoodOrSliderItem } from './types/type';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import barChart12 from 'public/images/subscription/bar-chart-12.svg';
import coinsStacked02 from 'public/images/subscription/coins-stacked-02.svg';
import award03 from 'public/images/subscription/award-03.svg';
import clockRewind from 'public/images/subscription/clock-rewind.svg';
import noodles from 'public/images/subscription/noodles.svg';
import target04 from 'public/images/subscription/target-04.svg';
import coin from 'public/images/coin.svg';
import productImg from 'public/images/suppd/shuppdproduct.png';
import Juice from 'public/images/categoryselector/juice.svg';
import shappdSliderimg1 from 'public/images/suppd/sliders/slider1.png';
import shappdSliderimg2 from 'public/images/suppd/sliders/slider2.png';
import shappdSliderimg3 from 'public/images/suppd/sliders/slider3.png';
import shappdSliderimg4 from 'public/images/suppd/sliders/slider4.png';
import forMenImg from 'public/images/shop/shopbycategory/men.png';
import forWomenImg from 'public/images/shop/shopbycategory/women.png';
import shopByCategorySliderImg1 from 'public/images/shop/shopbycategory/slider/slider1.png';
import shopByCategorySliderImg2 from 'public/images/shop/shopbycategory/slider/slider2.png';
import shopByCategorySliderImg3 from 'public/images/shop/shopbycategory/slider/slider3.png';
import shopByCategorySliderImg4 from 'public/images/shop/shopbycategory/slider/slider4.png';
import modelImg1 from 'public/images/shop/model/model1.png';
import modelImg2 from 'public/images/shop/model/model2.png';
import ShappedAll from 'public/images/shop/shapped/img/all.png';
import ShappedLeggins from 'public/images/shop/shapped/img/leggins.png';
import ShappedShorts from 'public/images/shop/shapped/img/shorts.png';
import ShappedSportsBras from 'public/images/shop/shapped/img/sports-bras.png';
import ShappedTops from 'public/images/shop/shapped/img/tops.png';
import SuppdAll from 'public/images/suppd/all.svg';
import Protein from 'public/images/suppd/protien.svg';
import Suppliments from 'public/images/suppd/suppliments.svg';
import Creatine from 'public/images/suppd/creatine6.svg';
import Gummy from 'public/images/suppd/gummy-3.svg';
import Bundles from 'public/images/suppd/bundles.svg';
import AllFood from 'public/images/categoryselector/all.svg';
import Meal from 'public/images/categoryselector/meals.svg';
import MuscleGain from 'public/images/categoryselector/muscleGain.svg';
import Cutting from 'public/images/categoryselector/cutting.svg';
import Accessories from 'public/images/categoryselector/acceserois.svg';
import Breakfast from 'public/images/categoryselector/breakfast.svg';
import Snacks from 'public/images/categoryselector/snacks.svg';
import CurrencyDollar from 'public/images/home/intro-products/currency-dollar-circle.svg';
import ChefHat from 'public/images/home/intro-products/chefhats.svg';
import Target04 from 'public/images/home/intro-products/target-04.svg';
export const selectCategories = [
  {
    img: cookd,
    name: 'cookd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
    path: 'cookd',
    sharedScreen: true,
  },
  {
    img: fueld,
    name: 'fueld',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/productSelect',
    path: 'fueld',
    sharedScreen: true,
  },
  {
    path: 'suppd',
    img: suppd,
    name: 'suppd',
    width: '158',
    border: '#FD4F01',
    pathName: '/(navigator)/(tabs)/shop' as const,
    sharedScreen: false,
  },
  {
    path: 'shaped',
    img: shaped,
    name: 'shaped',
    width: '158',
    border: '#FD4F01',
    pathName: '/(navigator)/(tabs)/shop' as const,
    sharedScreen: false,
  },
  {
    path: 'fueld',
    img: subscription,
    name: 'subscription',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/subscription',
  },
  {
    path: 'fueld',
    img: tracking,
    name: 'tracking',
    width: '158',
    border: '#FD4F01',
    pathName: '/(sharedScreens)/tracking',
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
    svg: () => createElement(AllFood),
    dutchName: 'Alle',
  },
  {
    name: 'Bundles',
    img: bundlesImg,
    id: 2,
    svg: () => createElement(AllFood),
    dutchName: 'Maaltijdbundels',
  },
  {
    name: 'Chicken',
    img: chickenImg,
    id: 3,
    svg: () => createElement(AllFood),
    dutchName: 'Kip',
  },
  {
    name: 'Beef',
    img: beefImg,
    id: 4,
    svg: () => createElement(AllFood),
    dutchName: 'Rundvlees',
  },
  {
    name: 'Fish',
    img: fishImg,
    id: 5,
    svg: () => createElement(AllFood),
    dutchName: 'Vis',
  },
  {
    name: 'Vegetarian',
    img: vegetarianImg,
    id: 6,
    svg: () => createElement(AllFood),
    dutchName: 'Vegetarisch',
  },
  // {
  //   name: 'Accessories',
  //   img: accessoriesImg,
  //   id: 7,
  //   svg: () => createElement(AllFood),
  // },
  // {
  //   name: 'Breakfast',
  //   img: accessoriesImg,
  //   id: 8,
  //   svg: () => createElement(AllFood),
  // },
];
export const fueldSelectedCategories = [
  {
    name: 'All',
    img: '',
    id: 1,
    svg: () => createElement(AllFood),
    dutchName: 'Alle',
  },
  {
    name: 'Weight Loss',
    img: '',
    id: 2,
    svg: () => createElement(AllFood),
    dutchName: 'Afvallen',
  },
  {
    name: 'Meal Packs',
    img: '',
    id: 3,
    svg: () => createElement(Meal),
    dutchName: 'Maaltijdpakketten',
  },
  {
    name: 'Muscle Gain',
    img: '',
    id: 4,
    svg: () => createElement(MuscleGain),
    dutchName: 'Spiermassa',
  },
  {
    name: 'Cutting',
    img: '',
    id: 5,
    svg: () => createElement(Cutting),
  },
  {
    name: 'Accessories',
    img: '',
    id: 6,
    svg: () => createElement(Accessories),
    dutchName: 'Accessoires',
  },
  {
    name: 'Breakfast',
    img: '',
    id: 7,
    svg: () => createElement(Breakfast),
    dutchName: 'Ontbijt',
  },
  {
    name: 'Snacks',
    img: '',
    id: 8,
    svg: () => createElement(Snacks),
    dutchName: 'Snack',
  },
  {
    name: 'Cold-Pressed Juices',
    img: '',
    id: 9,
    svg: () => createElement(Juice),
    dutchName: 'Cold-pressed sappen',
  },
];
export const shapedSelecteCategories = [
  {
    name: 'All',
    img: ShappedAll,
    svg: () => createElement(AllFood),
    id: 1,
    dutchName: 'Alle',
  },
  {
    name: 'Leggings',
    img: ShappedLeggins,
    svg: () => createElement(AllFood),
    id: 8,
    dutchName: 'Leggings',
  },
  {
    img: ShappedShorts,
    name: 'Shorts',
    svg: () => createElement(AllFood),
    id: 2,
  },
  {
    img: ShappedSportsBras,
    name: 'Sports Bras ',
    svg: () => createElement(AllFood),
    id: 3,
  },
  {
    img: ShappedTops,
    name: 'Tops',
    svg: () => createElement(AllFood),
    id: 4,
  },
  {
    img: ShappedAll,
    name: 'Sportjacks',
    svg: () => createElement(AllFood),
    id: 5,
  },
  {
    img: ShappedAll,
    name: 'Hoodies ',
    svg: () => createElement(AllFood),
    id: 6,
  },
  {
    img: ShappedAll,
    name: 'Accessories ',
    svg: () => createElement(AllFood),
    id: 7,
  },
];

export const foodSortByOptions = [
  {
    name: 'Price: Low to High',
    value: 'price_asc',
  },
  {
    name: 'Price: High to Low',
    value: 'price_desc',
  },
  {
    name: 'Newest to Oldest',
    value: 'oldest',
  },
  {
    name: 'Oldest to Newest',
    value: 'recent',
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
export const fueldFilter = [
  {
    name: 'price',
    filterOption: ['€0 - €10', '€10 - €20', '€20 - €50', '€50 - €100', '€100+'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'Goal',
    filterOption: ['Weight Loss', 'Muscle Gain', 'Cutting'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'Food Preference',
    filterOption: ['Chicken', 'Beef', 'Fish', 'Vegetarian', 'Vegan'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'General',
    filterOption: ['Best Seller', 'Comfort', 'Chef’s Favourite', 'Premium', 'Sale', 'New'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
];
export const suppdFilter = [
  {
    name: 'price',
    filterOption: ['€0 - €10', '€10 - €20', '€20 - €50', '€50 - €100', '€100+'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'For',
    filterOption: ['Men', 'Women'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'Concern',
    filterOption: ['Recovery', 'Skin', 'Immunity'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
  {
    name: 'General',
    filterOption: ['Best Seller', 'Sale', 'New'],
    bg: '#FFEDE5',
    border: '#FF7435',
  },
];
// export const foodOfItems: FoodOrSliderItem[] = [
//   {
//     type: 'food',
//     id: 2,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 3,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 4,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 5,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 6,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 7,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 8,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     // price: '€10',
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 1,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 2,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 3,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 4,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'slider',
//     id: 'slider-1',
//     images: [
//       {
//         img: foodsliderimg1,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 1,
//       },
//       {
//         img: foodsliderimg2,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 2,
//       },
//       {
//         img: foodsliderimg3,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#1E1F20',
//         id: 3,
//       },
//       {
//         img: foodsliderimg4,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 4,
//       },
//     ],
//   },
//   {
//     type: 'food',
//     id: 5,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 6,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 7,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 8,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     // price: '€10',
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 1,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 2,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 3,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 4,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'slider',
//     id: 'slider-1',
//     images: [
//       {
//         img: foodsliderimg1,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 1,
//       },
//       {
//         img: foodsliderimg2,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 2,
//       },
//       {
//         img: foodsliderimg3,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#1E1F20',
//         id: 3,
//       },
//       {
//         img: foodsliderimg4,
//         caption: 'Up to 10% OFF',
//         title: 'Subscribe & Save!',
//         text: '#FFFFFF',
//         id: 4,
//       },
//     ],
//   },
//   {
//     type: 'food',
//     id: 5,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 6,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 7,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
//   {
//     type: 'food',
//     id: 8,
//     name: 'STEW - MASHED POTATOES - CARROT MIX',
//     img: food,
//     // price: '€10',
//     price: [
//       {
//         quantity: '300 gr',
//         price: '€10',
//       },
//       {
//         quantity: '600 gr',
//         price: '€20',
//       },
//       {
//         quantity: '1 kg',
//         price: '€30',
//       },
//     ],
//     badge: 'Asian',
//   },
// ];

export const fueldFoodOfItems = [
  {
    type: 'food',
    id: 1,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 2,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 3,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 4,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
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
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 6,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 7,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
  },
  {
    type: 'food',
    id: 8,
    name: 'STEW - MASHED POTATOES - CARROT MIX',
    img: food,
    // price: '€10',
    price: '9',
    badge: 'Best Seller',
    calories: '333 kCal',
    weight: '300 g',
    protein: '30g',
    subBadge: 'Dry Training',
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
        title: 'starter',
        name: 'Starter Pack',
        badge: 'Current',
        price: 64.95 * 0.5 + 6.95,
        coins: 650,
        bonusCoins: 60,
        id: 'weekly1',
        originalPrice: 64.95 + 6.95,
        shippingPrice: 6.95,
        average: 9,
        planType: 'Weekly',
      },
      {
        title: 'balance',
        name: 'Balance Pack',
        badge: 'Current',
        price: 124.95 * 0.5,
        coins: 1250,
        bonusCoins: 120,
        originalPrice: 124.95,
        points: 1250,
        id: 'weekly2',
        shippingPrice: 0,
        average: 18,
        planType: 'Weekly',
      },
      {
        title: 'elite',
        name: 'Elite Pack',
        badge: 'Current',
        price: 249.95 * 0.5,
        coins: 2500,
        originalPrice: 249.95,
        bonusCoins: 250,
        id: 'weekly3',
        shippingPrice: 0,
        average: 36,
        planType: 'Weekly',
      },
    ],
    save: '10',
  },
  {
    name: 'Monthly Plan',
    plans: [
      {
        title: 'starter',
        planType: 'Monthly',
        name: 'Starter Pack',
        badge: 'Current',
        price: 124.95 * 0.5,
        originalPrice: 124.95,
        coins: 1250,
        bonusCoins: 120,
        shippingPrice: 0,
        id: 'monthly1',
        average: 18,
      },
      {
        title: 'balance',
        name: 'Balance Pack',
        planType: 'Monthly',
        badge: 'Current',
        price: 249.95 * 0.5,
        coins: 2500,
        originalPrice: 249.95,
        bonusCoins: 250,
        id: 'monthly2',
        average: 36,
        shippingPrice: 0,
      },
      {
        title: 'Elite',
        name: 'Elite Pack',
        planType: 'Monthly',
        badge: 'Current',
        price: 499.95 * 0.5,
        coins: 5000,
        originalPrice: 499.95,
        bonusCoins: 500,
        id: 'monthly3',
        shippingPrice: 0,
        average: 72,
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

export const activeMealsStatusBarColor = [
  {
    name: 'cookd',
    color: '#0A8A23',
    tentColor: '#0A8A23',
  },
  {
    name: 'fueld',
    color: '#FD4F01',
    tentColor: '#FD4F01',
  },
  {
    name: 'suppd',
    color: '#F9DFC2',
    tentColor: '#F9DFC2',
  },
  {
    name: 'shaped',
    color: '#7D3CFF',
    tentColor: '#7D3CFF',
  },
  {
    name: 'subscription',
    color: '#FD4F01',
    tentColor: '#FD4F01',
  },
  {
    name: 'tracking',
    color: '#588DF5',
    tentColor: '#588DF5',
  },
];

export const statusBarColor = {
  cookd: '#0A8A23',
  fueld: '#FD4F01',
  suppd: '#F9DFC2',
  shaped: '#7D3CFF',
  subscription: '#FD4F01',
  tracking: '#588DF5',
};
export const suppdSelectedCategories = [
  {
    name: 'All',
    id: 1,
    img: '',
    svg: () => createElement(SuppdAll),
    dutchName: 'Alle',
  },
  {
    name: 'Protein',
    id: 2,
    img: '',
    svg: () => createElement(Protein),
    dutchName: 'Eiwitten',
  },
  {
    name: 'Mineralen & vitaminen',
    id: 3,
    img: '',
    svg: () => createElement(Suppliments),
    dutchName: 'Mineralen & vitaminen',
  },
  {
    name: 'Gummies',
    id: 4,
    img: '',
    svg: () => createElement(Gummy),
    dutchName: 'Gummies',
  },
  {
    name: 'Creatine',
    id: 5,
    img: '',
    svg: () => createElement(Creatine),
    dutchName: 'Creatine',
  },
  {
    name: 'Bundles',
    id: 6,
    img: '',
    svg: () => createElement(Bundles),
    dutchName: 'Bundels',
  },
];

export const suppdProductCategories = {
  type: 'slider',
  id: 'slider-1',
  _id: 'slider-1',
  images: [
    {
      img: shappdSliderimg1,
      caption: 'Wellness Unlocked',
      title: 'Explore expert blogs on health & performance.',
      text: '#1E1F20',
      id: 1,
    },
    {
      img: shappdSliderimg2,
      caption: 'Wellness Unlocked',
      title: 'Explore expert blogs on health & performance.',
      text: '#1E1F20',
      id: 2,
    },
    {
      img: shappdSliderimg3,
      caption: 'Wellness Unlocked',
      title: 'Explore expert blogs on health & performance.',
      text: '#1E1F20',
      id: 3,
    },
    {
      img: shappdSliderimg4,
      caption: 'Wellness Unlocked',
      title: 'Explore expert blogs on health & performance.',
      text: '#FFFFFF',
      id: 4,
    },
  ],
};
export const shopByCategory = [
  {
    name: 'For Men',
    Img: forMenImg,
    gender: 'male',
  },
  {
    name: 'For Women',
    Img: forWomenImg,
    gender: 'female',
  },
];

export const shopByCategorySlider = [
  {
    img: shopByCategorySliderImg1,
    caption: 'Move with Purpose',
    title: 'Gear up in style and performance.',
    textPostion: 'left',
  },
  {
    img: shopByCategorySliderImg2,
    caption: 'Move with Purpose',
    title: 'Gear up in style and performance.',
    textPostion: 'right',
  },
  {
    img: shopByCategorySliderImg3,
    caption: 'Move with Purpose',
    title: 'Gear up in style and performance.',
    textPostion: 'left',
  },
  {
    img: shopByCategorySliderImg4,
    caption: 'Move with Purpose',
    title: 'Gear up in style and performance.',
    textPostion: 'left',
  },
];
export const shopProductSection = [
  {
    name: 'Shop Best Sellers',
    items: [
      {
        badge: 'new',
        img: modelImg1,
        badgeBg: '#7A62E9',
        color: 'white',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'new',
        img: modelImg1,
        badgeBg: '#7A62E9',
        color: 'white',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'new',
        img: modelImg1,
        badgeBg: '#7A62E9',
        color: 'white',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'new',
        img: modelImg1,
        badgeBg: '#7A62E9',
        color: 'white',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
    ],
  },
  {
    name: 'On Sale',
    items: [
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
      {
        badge: 'Sale',
        img: modelImg2,
        badgeBg: '#E4E0FB',
        color: '#1E1F20',
        subBadgeBg: '#E4E0FB',
        subBadgeColor: '#1E1F20',
        subBadge: 'HIIT',
        ratings: '4.8',
        name: 'PRODUCT NAME',
        price: '€XX',
        discount: '5',
      },
    ],
  },
];
export const gymProductsForWomen = [
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
  {
    badge: 'new',
    img: modelImg1,
    badgeBg: '#7A62E9',
    color: 'white',
    subBadgeBg: '#E4E0FB',
    subBadgeColor: '#1E1F20',
    subBadge: 'HIIT',
    ratings: '4.8',
    name: 'PRODUCT NAME',
    price: '€XX',
    discount: '5',
  },
];

export const onBoardingScreen = [
  {
    id: 1,
    img: 'public/images/on-boarding/onboarding1',
    statusBar: 'light',
  },
  {
    id: 2,
    img: 'public/images/on-boarding/onboarding2',
    statusBar: 'dark',
  },
  {
    id: 3,
    img: 'public/images/on-boarding/onboarding3',
    statusBar: 'light',
  },
  {
    id: 4,
    img: 'public/images/on-boarding/onboarding4',
    statusBar: 'light',
  },
  {
    id: 5,
    img: 'public/images/on-boarding/onboarding5',
    statusBar: 'light',
  },
];

export const shadows = {
  small: {
    shadowColor: 'rgba(10, 13, 18, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
  },
  violetShadow: {
    shadowColor: '#BDB0F4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },

  medium: {
    shadowColor: 'rgba(10, 13, 18, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 2,
  },
  large: {
    shadowColor: 'rgba(10, 13, 18, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 4,
  },
};

export const tabBarStyles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    borderRadius: 20,
    paddingHorizontal: 28,
    height: 68,
    paddingTop: 12,
    elevation: 7,
    shadowColor: '#B6BAC3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
});

export const mealsLists = [
  {
    name: 'Breakfast',
    lists: [{}],
  },
  {
    name: 'Snack',
    lists: [{}],
  },
];

export const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const HomeIntroProducts = [
  {
    id: 1,
    title1: 'CHOOSE YOUR MEALS',
    title2: 'or choose your plan',
    icon: CurrencyDollar,
    height: 342,
    img: require('public/images/home/intro-products/p1.png'),
    description: 'A menu of 30+ meals every week.',
    endTitle1: 'Pay Less, Get More -',
    endTitle2: 'Pause Anytime',
    top: -65,
    width: '100%',
    left: 'auto',
    right: 0,
    headerTitle: 'how you get your meals',
  },
  {
    headerTitle: 'how you get your meals',
    id: 2,
    title1: 'FRESHLY PREPARED',
    title2: 'BY OUR CHEFS',
    height: 265,
    icon: Target04,
    img: require('public/images/home/intro-products/p2.png'),
    description: 'Our chefs do all the prep work, so all you have to do is enjoy.',
    endTitle1: 'Tailored to Your',
    endTitle2: 'Taste and Lifestyle',
    width: 300,
    top: -80,
    right: 0,

    left: 'auto',
  },
  {
    headerTitle: 'how you get your meals',
    id: 3,
    height: 270,
    title1: 'WARM UP, EAT',
    title2: '& ENJOY',
    icon: ChefHat,
    description: 'No prep. No fuss. Our meals are ready to heat and eat in minutes.',
    img: require('public/images/home/intro-products/p3.png'),
    endTitle1: 'Chief’s Touch ',
    endTitle2: 'Personalizaton',
    width: 390,
    top: -80,
    right: -38,
    left: 'auto',
  },
];

export const HomeVideoSlider = [
  {
    img: require('public/images/home/intro-products/Influencer Reel (1).png'),
  },
  {
    img: require('public/images/home/intro-products/Influencer Reel (1).png'),
  },
  {
    img: require('public/images/home/intro-products/Influencer Reel (1).png'),
  },
];

export const WeeklyReview = [
  {
    img: require('public/images/home/intro-products/image.png'),
    title: 'Rose',
    description:
      '“First positive effects: I no longer feel tired during the day and feel more focused”',
  },
  {
    img: require('public/images/home/intro-products/image (1).png'),
    title: 'Rose',
    description:
      '“First positive effects: I no longer feel tired during the day and feel more focused”',
  },
  {
    img: require('public/images/home/intro-products/image.png'),
    title: 'Rose',
    description:
      '“First positive effects: I no longer feel tired during the day and feel more focused”',
  },
];

export const sliderData = {
  type: 'slider',
  _id: 'slider-1',
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
};

export const productBg = {
  cookd: '#E5F8EA',
  suppd: '#F3F4F6',
  fueld: '#F3F4F6',
};
