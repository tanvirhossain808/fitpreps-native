import { Button, Image } from 'tamagui';
import { Text, View, YStack } from 'tamagui';
import { FoodOfItem, fueld, SliderItem, suppd } from '~/types/type';
import SelectPrice from '../shared/SelectPrice';

export default function SupplementLists({
  item,
  productType,
}: {
  item: suppd[];
  productType: string;
}) {
  return (
    <YStack flexDirection="row" justifyContent="space-between" mb={20}>
      {item.map((product: FoodOfItem | fueld | suppd | SliderItem) => (
        <YStack
          key={product.id}
          w={'48%'}
          p={8}
          bg="white"
          gap={product.type === 'product' && (product as suppd)?.protein ? 20 : 12}
          borderColor="#B6BAC3"
          borderWidth={1}
          borderRadius={8}>
          <View
            py={15}
            justifyContent="center"
            alignItems="center"
            height={165}
            width={'100%'}
            alignSelf="stretch"
            flex={1}
            bg="#E5F8EA"
            borderRadius={4}>
            {product.type === 'product' && (
              <Image
                source={product.img}
                style={{ width: '110', height: 100 }}
                resizeMode="cover"
                // resizeMode="contain"
              />
            )}
            {product.type === 'product' && (
              <Text
                position="absolute"
                p={'$2'}
                top={6}
                left={6}
                fontSize={10}
                fontWeight={700}
                color="white"
                bg="#FF7435"
                borderRadius={20}>
                {product.badge}
              </Text>
            )}
            {product.type === 'product' && (product as suppd)?.protein && (
              <YStack
                borderTopWidth={1}
                borderLeftWidth={0.1}
                borderRightWidth={0.1}
                borderColor="#FD4F01"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                bottom={-20}
                top="100%"
                right={'50%'}
                transform={[{ translateX: '50%' }]}
                width={50}
                height={50}
                bg="#FFF"
                borderRadius={50}>
                <View bg="white" position="absolute" inset={0} borderRadius={25} top={20}></View>
                <Text fontSize={13} color="#FD4F01" fontFamily="$oswald" fontWeight={700}>
                  {(product as suppd)?.protein}
                </Text>
                <Text color="#1E1F20" fontWeight={500} fontSize={12}>
                  protein
                </Text>
              </YStack>
            )}
          </View>
          <YStack gap={8}>
            {product.type === 'product' && productType === 'suppd' && (
              <Text
                px={6}
                py={4}
                maxWidth={71}
                textAlign="center"
                bg="#FAEAE1"
                borderRadius={20}
                color="#1E1F20"
                fontSize={10}
                fontWeight={500}>
                {product.type === 'product' && (product as suppd).subBadge}
              </Text>
            )}
            {product.type === 'product' && (
              <Text
                fontSize={11.5}
                fontWeight={700}
                color="#1E1F20"
                numberOfLines={2}
                ellipsizeMode="tail">
                {product.name}
              </Text>
            )}
            {product.type === 'product' && Array.isArray(product.price) ? (
              <View>
                <SelectPrice values={product.price} />
              </View>
            ) : (
              product.type === 'product' && (
                <View>
                  <Text fontSize={14} fontWeight={700} color="#FD4F01">
                    € {product?.price}
                  </Text>
                  <Text fontSize={12} fontWeight={500} color="#1E1F20">
                    333 kCal <Text> | </Text>
                    <Text>475 g</Text>
                  </Text>
                </View>
              )
            )}
            <Button fontSize={15} color="white" fontWeight={700} bg="#FD4F01" borderRadius={8}>
              {productType === 'cookd' ? 'Add & Fuel Up' : 'Add'}
            </Button>
          </YStack>
        </YStack>
      ))}
      {/* If only one food item in the row, add an empty space to keep grid */}
      {item.length === 1 && <YStack w={'48%'} />}
    </YStack>
  );
}
