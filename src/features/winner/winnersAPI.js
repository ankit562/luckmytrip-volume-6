import axios from '../../lib/axios';

const WINNER_URL = '/api/v1/draw-winner';

export const fetchRecentWinners = (period) =>axios.get(`${WINNER_URL}/recent?period=${period}`);