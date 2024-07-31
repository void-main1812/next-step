import { useAuth } from '@clerk/clerk-expo';
import Container from 'components/Container';
import { useGetBookmarks } from 'hooks/queries/BookmarkQueries';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { spacing } from 'styles/spacing';
import { typographyStyles } from 'styles/typography';
import EmptyBookmarkState from '../components/EmptyBookmarkState';

const Bookmarks = () => {
  const { theme } = useStyles();

  const { userId } = useAuth();

  const { bookmarks, status: bookmarksFetchingStatus } = useGetBookmarks(userId!);

  if (bookmarksFetchingStatus === 'pending') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: spacing.height[4],
          backgroundColor: theme.components.Background.color,
        }}>
        <ActivityIndicator size="large" color={theme.components.Text.heading_1} />
        <Text style={typographyStyles(theme).heading_3}>Fetching Bookmarks</Text>
      </View>
    );
  }

  return (
    <>
      {bookmarks ? (
        <Container>
          <View>
            <Text style={typographyStyles(theme).heading_1}>Bookmarks</Text>
          </View>
        </Container>
      ) : (
        <EmptyBookmarkState />
      )}
    </>
  );
};

export default Bookmarks;
