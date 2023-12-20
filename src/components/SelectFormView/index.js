import React, { useContext, useMemo } from 'react';
import dayjs from 'dayjs';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// icons
import { Edit, ChevronRight } from '@mui/icons-material';

// redux
import { UserContext } from 'context/user';
import TextTeaserCard from 'components/TextTeaserCard/index';

// eslint-disable-next-line react/prop-types
const SelectFormView = ({ formType, sections }) => {
  const { createForm, formsData = {} } = useContext(UserContext);
  const visibleForms = useMemo(() => {
    const formsToUse = {};
    Object.keys(formsData).forEach((formKey) => {
      const currentForm = formsData[formKey];
      if (currentForm.type === formType) {
        formsToUse[formKey] = currentForm;
      }
    });

    return formsToUse;
  }, [formType, formsData]);

  console.log('formsData', formsData);

  const theme = useTheme();
  const addForm = () => {
    createForm({ title: `Formular vom ${dayjs(new Date()).format('DD.MM.YYYY')}`, type: formType });
  };

  const formCardsDom = () => {
    const formIds = Object.keys(visibleForms);
    const formCards =
      formIds
        .map((formId) => {
          const formData = visibleForms[formId];
          const sectionsDom = sections?.map((section) => {
            return (
              <Grid key={formId} item xs={12} sm={6}>
                <TextTeaserCard
                  grow
                  primaryText={
                    <Stack
                      sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                      component="span"
                    >
                      {section.label}
                      <Edit
                        sx={{
                          opacity: '0.2',
                          fontSize: 55,
                          margin: '0 -0.35em -0.2em'
                        }}
                      />
                    </Stack>
                  }
                  // prefixText={`zuletzt bearbeitet: ${dayjs(formData.creationDate).format('DD.MM.YYYY')}`}
                  prefixText={'Blatt'}
                  link={`/office/form/${formId}/${section.linkPart}`}
                  color={theme.palette.primary.light}
                />
              </Grid>
            );
          });

          return (
            <Stack key={formId} flexDirection="column" sx={{ mb: { xs: theme.spacing(4), md: theme.spacing(5), lg: theme.spacing(6) } }}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {formData.title || 'Formular: ' + formData.id}
              </Typography>
              <Grid spacing={3} container>
                {sectionsDom}
              </Grid>
            </Stack>
          );
        })
        .filter(Boolean) || [];

    return (
      <>
        <Stack sx={{ marginBottom: theme.spacing(3) }}>
          {formCards}
          <Grid item xs={12} sm={6} sx={{ mt: theme.spacing(4)}}>
            <TextTeaserCard
              onClick={addForm}
              primaryText={
                <Stack flexDirection="row" alignItems="center">
                  Neues Angabenset{' '}
                  <ChevronRight
                    sx={{
                      opacity: '0.2',
                      fontSize: 65,
                      margin: '0 -0.35em -0.35em 1rem'
                    }}
                  />
                </Stack>
              }
              prefixText="Erstellen Sie ein"
              color={theme.palette.common.white}
              light
            ></TextTeaserCard>
          </Grid>
        </Stack>
      </>
    );
  };

  return formCardsDom();
};

export default SelectFormView;
