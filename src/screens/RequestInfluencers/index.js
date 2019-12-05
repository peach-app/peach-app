import React from 'react';
import { Animated } from 'react-native';
import { createDndContext } from 'react-native-easy-dnd';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import { Grid, GridItem } from '../../components/Grid';
import Avatar from '../../components/Avatar';
import Title from '../../components/Title';
import {
  InfluencersContainer,
  dropZoneStyles,
  DropZoneText,
  AvatarWrapper,
} from './styles';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput/Input';
import Button from '../../components/Button';
import Actions from '../../components/Actions';

const influencers = [
  {
    name: 'Josh Parret',
  },
  {
    name: 'Rosen',
  },
  {
    name: 'Josh Parret',
  },
  {
    name: 'Sexy',
  },
  {
    name: 'Beast',
  },
  {
    name: 'Kiro',
  },
  {
    name: 'Pesho',
  },
  {
    name: 'Msy',
  },
];

const RequestInfluencers = ({ navigation }) => {
  const { Provider, Droppable, Draggable } = createDndContext();

  return (
    <SafeAreaView>
      {console.log('vaaa', navigation)}
      <Header title="Request Influencers" />
      <StatusBar />
      <Provider>
        <Container>
          <Grid>
            {/* <GridItem size={12}>
              <Title>Drag and drop the influencers you like</Title>
            </GridItem> */}

            <GridItem size={12}>
              <TextInput
                label="Search influencers"
                name="search"
                value="Search.."
              />
            </GridItem>
            <GridItem size={12}>
              <InfluencersContainer>
                {influencers.map(influencer => (
                  <Draggable
                    onDragStart={() => {
                      console.log('Started draggging');
                    }}
                    onDragEnd={() => {
                      console.log('Ended draggging');
                    }}
                    payload={influencer.name}
                  >
                    {({ viewProps }) => {
                      return (
                        <Animated.View {...viewProps}>
                          <AvatarWrapper>
                            <Avatar size={70} fallback={influencer.name} />
                          </AvatarWrapper>
                        </Animated.View>
                      );
                    }}
                  </Draggable>
                ))}
              </InfluencersContainer>
            </GridItem>

            <GridItem size={12} alignSelf="flex-end">
              <Droppable
                onEnter={() => {
                  console.log('Draggable entered');
                }}
                onLeave={() => {
                  console.log('Draggable left');
                }}
                onDrop={({ payload }) => {
                  console.log(
                    'Draggable with the following payload was dropped',
                    payload
                  );
                }}
              >
                {({ active, viewProps }) => {
                  return (
                    <Animated.View
                      {...viewProps}
                      style={[dropZoneStyles, viewProps.style]}
                    >
                      <DropZoneText>Drop here</DropZoneText>
                    </Animated.View>
                  );
                }}
              </Droppable>
            </GridItem>
            <GridItem size={12}>
              <Actions>
                <Button title="Create" fixedWidth />
              </Actions>
            </GridItem>
          </Grid>
        </Container>
      </Provider>
    </SafeAreaView>
  );
};

export default RequestInfluencers;
