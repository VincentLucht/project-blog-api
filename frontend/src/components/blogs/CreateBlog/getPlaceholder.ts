import { ContentTypes } from '../BlogDetail/BlogDetail';

export function getPlaceholder(type: ContentTypes) {
  switch (type) {
    case 'large header':
    case 'header':
    case 'small header':
      return 'Enter header';

    case 'text':
      return 'Enter text';

    case 'image':
      return 'Enter image URL';

    case 'line break':
      return 'Add line break';

    case 'code block':
      return 'Add code block';

    default:
      return 'Enter value';
  }
}
