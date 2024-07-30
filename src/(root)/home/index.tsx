import { useAuth, useUser } from '@clerk/clerk-react';
import Button from 'components/Button';
import Container from 'components/Container';
import JobCard from 'components/JobCard';
import SearchBox from 'components/SearchBox';
import { JobCategories } from 'global/MockData';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import { height, width } from 'utils/Size';
import CategoriesChip from '../components/CategoriesChip';

const HomeScreen = ({ navigation }: any) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const { theme, styles } = useStyles(styleSheet);

  useEffect(() => {
    if (!isSignedIn) {
      navigation.replace('Auth');
    }
  }, [isSignedIn]);

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeText}>
              Hello <Text style={styles.userNameText}>{user?.firstName},</Text> {'\n'}
              Let's find a job for you!
            </Text>
          </View>
          <View style={styles.searchBoxContainer}>
            <SearchBox placeholder="Eg. Software Engineer" />
            <Button size="icon" rightIcon="filter" />
          </View>
        </View>
        <View style={{ gap: spacing.height[5] }}>
          <Text style={[styles.sectionHeading, { paddingLeft: spacing.height[6] }]}>
            Categories
          </Text>
          <FlatList
            data={JobCategories}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ maxHeight: height(5) }}
            contentContainerStyle={{
              marginHorizontal: spacing.height[6],
            }}
            renderItem={({ item }) => <CategoriesChip item={item} onPress={() => {}} />}
          />
        </View>
        <View style={styles.jobContainer}>
          <Text style={styles.sectionHeading}>Best Picks for You</Text>
          <JobCard
            jobId="job1"
            companyName="Amazon"
            jobTitle="Android Developer"
            jobType="Full Time"
            salary="250k"
            location="Banglore, Karnataka, India"
            companyLogo={require('../../../assets/AmazonIcon.png')}
          />
          <JobCard
            jobId="job1"
            companyName="Amazon"
            jobTitle="Android Developer"
            jobType="Full Time"
            salary="250k"
            location="Banglore, Karnataka, India"
            companyLogo={require('../../../assets/AmazonIcon.png')}
          />
        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;

const styleSheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: spacing.height[10],
    maxWidth: width(100),
    overflow: 'visible',
  },

  welcomeText: {
    ...typographyStyles(theme).heading_2,
    color: theme.colors.Neutral[400],
  },

  userNameText: {
    color: typographyStyles(theme).heading_1.color,
  },

  headerContainer: {
    width: '100%',
    gap: spacing.height[5],
    padding: spacing.height[6],
  },

  searchBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: spacing.height[4],
  },

  sectionHeading: {
    ...typographyStyles(theme).heading_3,
  },

  jobContainer: {
    gap: spacing.height[5],
    paddingHorizontal: spacing.height[6],
    width: '100%',
  },
}));
