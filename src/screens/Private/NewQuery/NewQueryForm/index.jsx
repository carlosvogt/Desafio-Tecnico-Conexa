import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { validateDate } from '@utils/validators';

function NewQueryForm({ onSubmit, isSubmitting }) {
  const { t } = useTranslation();
  const date = useRef();
  const hour = useRef();
  const observation = useRef();

  const styles = StyleSheet.create({
    buttonContainer: {
      paddingTop: 64,
      alignItems: 'center',
    },
    button: { width: 250 },
  });

  const schema = Yup.object().shape({
    name: Yup.string().required(t('formErrors:required')),
    date: Yup.string()
      .required(t('formErrors:required'))
      .test('date', t('formErrors:date'), (value) => {
        if (value) {
          const newSchema = Yup.string().matches(
            validateDate,
            t('formErrors:date'),
          );
          return newSchema.isValidSync(value);
        }
        return true;
      }),
    hour: Yup.string()
      .required(t('formErrors:required'))
      .length(5, t('formErrors:hour')),
    observation: Yup.string().notRequired(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  return (
    <>
      <Form.TextInput
        name="name"
        label={t('newQuery:name')}
        errorMessage={errors.name?.message}
        control={control}
        returnKeyType="next"
        onSubmitEditing={() => date.current.focus()}
      />
      <Form.TextInput
        inputRef={date}
        name="date"
        label={t('newQuery:date')}
        errorMessage={errors.date?.message}
        control={control}
        returnKeyType="next"
        maskType="date"
        keyboardType="numeric"
        maxLength={10}
        onSubmitEditing={() => hour.current.focus()}
      />
      <Form.TextInput
        inputRef={hour}
        name="hour"
        label={t('newQuery:hour')}
        errorMessage={errors.hour?.message}
        control={control}
        returnKeyType="next"
        maskType="hour"
        keyboardType="numeric"
        maxLength={5}
        onSubmitEditing={() => observation.current.focus()}
      />
      <Form.TextInput
        inputRef={observation}
        name="observation"
        label={t('newQuery:observation')}
        errorMessage={errors.observation?.message}
        control={control}
        multiline
        returnKeyType="done"
        style={{ height: 150 }}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={
            isSubmitting ? t('newQuery:scheduling') : t('newQuery:schedule')
          }
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        />
      </View>
    </>
  );
}

NewQueryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

NewQueryForm.defaultProps = {
  isSubmitting: false,
};

export default NewQueryForm;
