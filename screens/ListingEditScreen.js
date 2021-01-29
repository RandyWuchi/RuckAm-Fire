import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import CategoryPickerItem from '../components/CatergoryPickerItem';
import {
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  SubmitButton,
} from '../components/Forms';
import Colors from '../constants/Colors';
import { categories } from '../data/Categories';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const ListingEditScreen = () => {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    setLoading(false);
  };
  return (
    <>
      <ActivityIndicator visible={loading} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior='padding'
          style={[
            styles.container,
            { backgroundColor: Colors[colorScheme].background },
          ]}
        >
          <Form
            initialValues={{
              title: '',
              price: '',
              description: '',
              category: null,
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker name='images' />
            <FormField maxLength={255} name='title' placeholder='Title' />
            <FormField
              keyboardType='numeric'
              maxLength={8}
              name='price'
              placeholder='Price'
              width={120}
            />
            <FormPicker
              items={categories}
              name='category'
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder='Category'
              width='50%'
            />
            <FormField
              maxLength={255}
              multiline
              name='description'
              placeholder='Description'
            />
            <View>
              <SubmitButton title='Post' />
            </View>
          </Form>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
