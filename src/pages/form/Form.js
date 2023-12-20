import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// project import
import { UserContext } from 'context/user';
import ColoredSection from 'components/pageLayout/header/ColoredSection/index';
import Annahmen from 'formConfigs/annahmen/Form/index';
import Mitarbeiter from 'formConfigs/mitarbeiter/Form/index';
import FullPageLoader from 'components/FullPageLoader/index';

// ==============================|| SAMPLE PAGE ||============================== //

const FormComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { activeFormId, activeFormData, setActiveFormId } = useContext(UserContext);
  const activeFormTitle = useMemo(() => activeFormData?.title, [activeFormData]);
  const { formId, formSection } = useParams();

  useEffect(() => {
    if (!formId) {
      navigate('/');
    } else {
      if (formId !== activeFormId) {
        setActiveFormId(formId);
      }
    }
  }, [activeFormId, formId, setActiveFormId, navigate]);

  const content = useMemo(() => {
    if (activeFormData) {
      const formLiteral = {
        annahmen: <Annahmen />,
        mitarbeiter: <Mitarbeiter />
      };

      return formLiteral[formSection] || 'Es ist ein Fehler aufgetreten.';
    }

    return <FullPageLoader />;
  }, [activeFormData, formSection]);

  return (
    <Box mb={theme.shape.layoutDesignGutterReset}>
      <ColoredSection
        backLink="/office/form/overview"
        bgColor={theme.palette.primary[800]}
        headline={`Formular${activeFormTitle ? `: ${activeFormTitle}` : ''}`}
      />
      {content}
    </Box>
  );
};

export default FormComponent;
