import { isDesktop } from "../../../utils/display-utils";

export interface CustomImageProps {
  src: string | null;
}

export const CustomImage = (props: CustomImageProps) => {
  const { src } = props;
  const isDesktopView = isDesktop();
  const _width = isDesktopView ? "250px" : "100px";
  const _height = isDesktopView ? "250px" : "100px";

  if (!src) {
    return null;
  }

  return (
    <img
      style={{
        width: _width,
        height: _height,
      }}
      src={src}
      alt="uploaded image"
    />
  );
};
