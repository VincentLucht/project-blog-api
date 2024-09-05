import { ContentTypes } from '../BlogDetail/BlogDetail';

export function getPlaceholder(type: ContentTypes) {
  switch (type) {
    case 'text':
      return 'Enter text';
    case 'header':
      return 'Enter header';
    case 'image':
      return 'Enter image URL';
    default:
      return 'Enter value';
  }
}
