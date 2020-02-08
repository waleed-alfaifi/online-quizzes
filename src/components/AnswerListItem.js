import { ListItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const AnswerListItem = withStyles(theme => ({
  root: {
    '&$selected, &$selected:hover': {
      backgroundColor: theme.palette.success.light,
    },
  },
  selected: {
    backgroundColor: theme.palette.success.light,
  },
}))(ListItem);

export default AnswerListItem;
