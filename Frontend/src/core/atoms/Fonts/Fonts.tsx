import { fontNames, fontTypes } from './fontConfig';

export default function FontLinks() {
  return (
    <>
      {fontNames?.map((fontName) =>
        fontTypes?.map((fontType) => (
          <link
            key={`${fontName}.${fontType}`}
            href={`/fonts/${fontName}.${fontType}`}
            rel="preload"
            as="font"
            type={`font/${fontType}`}
            crossOrigin="anonymous"
          />
        ))
      )}
      {/* <style>
        {fontConfigs
          .map(
            (font) =>
              `@font-face{font-family: ${font.family};src: url('/fonts/${font.file}.woff2') format('woff2'),url('/fonts/${font.file}.woff') format('woff'),url('/fonts/${font.file}.opentype') format('opentype');font-display: ${font.display};font-weight: ${font.weight};font-style: ${font.style};font-stretch: ${font.stretch}; }`
          )
          .join(' ')}
      </style> */}
    </>
  );
}
