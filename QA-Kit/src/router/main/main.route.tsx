import Main from '../../Pages/Main';
import Image from '../../Pages/Image';
import ImageFormatOne from '../../Pages/Image/format 1/ImageFormatOne';
import ImageFormatTwo from '../../Pages/Image/format 2/ImageFormatTwo';
import ImageFormatThree from '../../Pages/Image/format 3/ImageFormatThree';
import Video from '../../Pages/Video';

export const mainRoutes = [
  {
    element: <Main />,
    path: '/',
    children: [
      {
        index: true,
        element: <Image />
      },
      {
        path: 'picture',
        element: <Image />
      },
      {
        path: 'picture/format1',
        element: <ImageFormatOne />
      },
      {
        path: 'picture/format2',
        element: <ImageFormatTwo />
      },
      {
        path: 'picture/format3',
        element: <ImageFormatThree />
      },
      {
        path: 'video',
        element: <Video />
      }
    ]
  }
];