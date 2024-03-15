import { StarIcon } from '@chakra-ui/icons';

const Star = ({ rating = 0, star = 0 }) => (
	<StarIcon color={rating >= star || rating === 0 ? 'red.300' : 'gray.200'} />
);

export default Star;