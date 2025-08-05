import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function Index() {
  const { user } = useSelector((state: RootState) => state.user);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }
  if (!user) {
    return <Redirect href="/(on-boarding)" />;
  }
  // return <Redirect href="/(on-boarding)" />;
  // return <Redirect href="/(on-boarding)" />;
  // return <Redirect href="/(sharedScreens)/tracking" />;
  // return <Redirect href="/(sharedScreens)/subscription" />;
  // return <Redirect href="/workout" />;
  // return <Redirect href="/(tabs)/meals" />;
}
