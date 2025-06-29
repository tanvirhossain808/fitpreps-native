import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accordion, Input, ScrollView, Text, XStack, YStack } from 'tamagui';
import DrawerPageHeader from '~/components/drawer/DrawerPageHeader';
import FaqsOptionSelector from '~/components/faqs/FaqsOptionSelector';
import { FaqCategory } from '~/types/type';
import Feather from '@expo/vector-icons/Feather';
import { Octicons } from '@expo/vector-icons';
import { shadows } from '~/constant';
export default function Faqs() {
  const [faqCategory, setFaqCategory] = useState(subscriptionFaqs[0]);
  return (
    <YStack f={1} bg="white">
      <SafeAreaView style={{ ...style.container }}>
        <DrawerPageHeader title="FAQs" />
        <YStack f={1}>
          <YStack py="$5" gap="$7">
            <FaqsOptionSelector
              faqCategory={faqCategory}
              setFaqCategory={setFaqCategory}
              data={subscriptionFaqs}
            />
            <XStack px="$4">
              <XStack
                bg="white"
                alignItems="center"
                pr={14}
                flex={1}
                borderColor="#E8EFFF"
                borderWidth={1}
                minWidth={200}
                borderRadius={8}
                justifyContent="space-between"
                {...shadows.small}>
                <Input
                  placeholder="Search here"
                  flex={1}
                  focusStyle={{
                    borderColor: 'transparent',
                    outlineWidth: 0,
                    shadowColor: 'transparent',
                  }}
                  minWidth={100}
                  bg="transparent"
                  borderColor="$colorTransparent"
                />
                <TouchableOpacity>
                  <Octicons name="search" size={20} color="black" />
                </TouchableOpacity>
              </XStack>
            </XStack>
            <ScrollView pb={60} showsVerticalScrollIndicator={false}>
              <YStack px="$4" pb={100}>
                <Accordion collapsible type="single" gap="$3">
                  {faqCategory.faqs.map((faq, index) => (
                    <Accordion.Item
                      px="$4"
                      py="$3"
                      key={index}
                      value={`item-${index}`}
                      borderRadius={12}
                      bg="#f6f6f8">
                      <Accordion.Trigger p={0} bg="$backgroundTransparent" borderWidth={0}>
                        {({ open }: { open: boolean }) => (
                          <>
                            <XStack
                              w="100%"
                              justifyContent="space-between"
                              gap={8}
                              alignItems="flex-start">
                              <Text
                                flex={1}
                                flexShrink={1}
                                fontSize={16}
                                textWrap="wrap"
                                fontWeight="600"
                                color="#1E1F20">
                                {faq.question}
                              </Text>
                              <XStack>
                                <Feather name={open ? 'chevron-up' : 'chevron-down'} size={24} />
                              </XStack>
                            </XStack>
                          </>
                        )}
                      </Accordion.Trigger>
                      <Accordion.Content exitStyle={{ opacity: 0 }} bg="transparent" p={0} mt="$4">
                        <Text color="#6B7280" fontSize={14}>
                          {faq.answer}
                        </Text>
                      </Accordion.Content>
                      {/* </Accordion.HeightAnimator> */}
                    </Accordion.Item>
                  ))}
                </Accordion>
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      </SafeAreaView>
    </YStack>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const subscriptionFaqs: FaqCategory[] = [
  {
    name: 'Meals',
    faqs: [
      {
        question: 'What makes Fit Preps meals special?',
        answer:
          'Our meals are crafted by professional nutritionists and chefs, using only the freshest, high-quality ingredients. Each meal is carefully portioned to provide optimal nutrition while maintaining great taste and variety.',
      },
      {
        question: 'How many calories are in each meal?',
        answer:
          'Our meals range from 350-600 calories, with clear nutritional information provided for each dish. You can choose meals based on your specific dietary goals and calorie requirements.',
      },
      {
        question: 'Are there options for dietary restrictions?',
        answer:
          'Yes! We offer vegetarian, vegan, gluten-free, and dairy-free options. Please check individual meal descriptions for specific dietary information.',
      },
    ],
  },
  {
    name: 'Subscription',
    faqs: [
      {
        question: 'How do I cancel my subscription?',
        answer:
          'You can cancel your subscription at any time through your account settings. Changes will take effect at the end of your current billing cycle.',
      },
      {
        question: 'Can I skip a delivery?',
        answer:
          'Absolutely! You can skip any delivery up to one week before your scheduled delivery date through your account dashboard.',
      },
      {
        question: 'How do I update my payment method?',
        answer:
          'You can update your payment information in the payment section of your account settings at any time.',
      },
    ],
  },
  {
    name: 'Workouts & Tracking',
    faqs: [
      {
        question: 'How do I access workout plans?',
        answer:
          'All workout plans are available in the "My Workouts" section of your account after signing in. You can filter by difficulty, duration, and focus area.',
      },
      {
        question: 'Can I track my progress?',
        answer:
          'Yes, our app includes comprehensive tracking features for workouts, nutrition, and body measurements to help you monitor your fitness journey.',
      },
      {
        question: 'Are the workouts suitable for beginners?',
        answer:
          'We offer workouts for all fitness levels, from beginner to advanced. Each exercise includes modifications to match your current ability.',
      },
    ],
  },
  {
    name: 'Gym Wear & Supplements',
    faqs: [
      {
        question: 'How do I choose the right size?',
        answer:
          'We provide detailed size charts for all our gym wear. For the best fit, measure yourself according to our guide and compare with the size chart before ordering.',
      },
      {
        question: 'What supplements do you recommend?',
        answer:
          'Our supplement recommendations are based on your fitness goals and dietary needs. You can schedule a free consultation with our nutritionists for personalized advice.',
      },
      {
        question: 'What is your return policy?',
        answer:
          'Unworn, unwashed items with original tags can be returned within 30 days of delivery. Please see our Returns Policy for more details.',
      },
    ],
  },
  {
    name: 'Delivery',
    faqs: [
      {
        question: 'How do I track my delivery?',
        answer:
          "You'll receive a tracking number via email once your order ships. You can track your package in real-time through our website or app.",
      },
      {
        question: 'What are your delivery areas?',
        answer:
          'We currently deliver to all major cities nationwide. Enter your ZIP code during checkout to confirm delivery availability in your area.',
      },
      {
        question: "What if I'm not home for delivery?",
        answer:
          "Our temperature-controlled packaging keeps meals fresh for several hours. If you won't be home, we recommend designating a safe, shaded spot for delivery.",
      },
    ],
  },
  {
    name: 'Payment',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit/debit cards, PayPal, and Apple Pay. All transactions are securely processed with bank-level encryption.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Absolutely. We use industry-standard SSL encryption to protect your payment information and never store your full credit card details on our servers.',
      },
      {
        question: 'Do you offer gift cards?',
        answer:
          'Yes! Gift cards are available in various denominations and can be purchased through our website. They never expire and can be used for any of our products or services.',
      },
    ],
  },
];
