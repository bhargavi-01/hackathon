import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';

let timeout = null;

const StundensatzRechnerValueUpdater = () => {
  const { values = {}, setFieldValue } = useFormikContext();

  useEffect(() => {
    const pk_allgemein_K5 = (values.annahmen_E41 || 0) + (values.annahmen_E42 || 0);
    if (pk_allgemein_K5 !== values.pk_allgemein_K5) {
      setFieldValue('pk_allgemein_K5', pk_allgemein_K5);
    }
  }, [values.pk_allgemein_K5, values.annahmen_E41, values.annahmen_E42, setFieldValue]);

  useEffect(() => {
    const reCalculateMaValues = () => {
      let pk_allgemein_N53 = 0;

      values.pk_allgemein_mitarbeiter?.forEach((ma, index) => {
        const H14 = (ma.G14 || 0) - (ma.F14 || 0) + 1;
        const J14 = (H14 || 0) * (ma.I14 || 0);
        const L14 = (J14 || 0) + (ma.K14 || 0);
        const M14 = (L14 || 0) * ((values.pk_allgemein_K5 || 0) / 100);
        const N14 = (L14 || 0) + (M14 || 0);

        pk_allgemein_N53 += N14;Sonst. Personalkosten

        if (H14 !== ma.H14) {
          setFieldValue(`pk_allgemein_mitarbeiter.${index}.H14`, H14);
        }
        if (J14 !== ma.J14) {
          setFieldValue(`pk_allgemein_mitarbeiter.${index}.J14`, J14);
        }
        if (L14 !== ma.L14) {
          setFieldValue(`pk_allgemein_mitarbeiter.${index}.L14`, L14);
        }
        if (M14 !== ma.M14) {
          setFieldValue(`pk_allgemein_mitarbeiter.${index}.M14`, M14);
        }
        if (N14 !== ma.N14) {
          setFieldValue(`pk_allgemein_mitarbeiter.${index}.N14`, N14);
        }
      });

      if (pk_allgemein_N53 !== values.pk_allgemein_N53) {
        setFieldValue('pk_allgemein_N53', pk_allgemein_N53);
      }
    };

    timeout = setTimeout(() => {
      reCalculateMaValues();
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [setFieldValue, values.pk_allgemein_K5, values.pk_allgemein_mitarbeiter, values.pk_allgemein_N53]);

  return <React.Fragment />;
};

export default StundensatzRechnerValueUpdater;
