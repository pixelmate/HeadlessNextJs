import { useMemo } from 'react';
import getBorderColor from 'utils/getBorderColor';
import getColorContrast from 'utils/getColorContrast';
import getAlignment, { type AlignmentType } from 'utils/getAlignment';

export type panelParamTypes = {
  BackgroundColorContrast: string;
  TitleAlignment: string;
};

const usePanelClasses = (params: panelParamTypes) => {
  const { textColorClassName, bgColorClassName, borderColorClassName, alignmentClass } =
    useMemo(() => {
      const backgroundColorContrast =
        params?.BackgroundColorContrast && JSON.parse(params?.BackgroundColorContrast);
      const { textColorClassName, bgColorClassName } = getColorContrast(
        backgroundColorContrast?.name
      );
      const { borderColorClassName } = getBorderColor(
        backgroundColorContrast?.name.split(' ')[0] || ''
      );
      const alignmentClass = getAlignment(params?.TitleAlignment as AlignmentType);
      return { textColorClassName, bgColorClassName, borderColorClassName, alignmentClass };
    }, [params?.BackgroundColorContrast, params?.TitleAlignment]);

  return { textColorClassName, bgColorClassName, borderColorClassName, alignmentClass };
};

export default usePanelClasses;
