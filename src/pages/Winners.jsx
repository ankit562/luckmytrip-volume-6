import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Crown } from 'lucide-react';
import { getRecentWinners } from '../features/winner/winnersSlice';
import Header from '../components/commonComponent/Header';

const periods = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];

const WinnerList = () => {
  const [period, setPeriod] = useState('daily');
  const dispatch = useDispatch();
  const { winners = [], loading, } = useSelector(state => state.winner);

  useEffect(() => {
    dispatch(getRecentWinners(period));
  }, [dispatch, period]);

  return (
    <div className='bg-[#E9F2FF] min-h-screen'>
    <Header/>
    <div className="max-w-5xl mx-auto p-3 sm:p-6 ">
      {/* Header with Responsive Dropdown */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">
        <h2 className="text-2xl md:text-4xl text-red-500 font-semibold font-berlin text-center md:text-left">
          Recent Winners
        </h2>
        <div className="flex justify-center md:justify-end">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-red-300 rounded-md  px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            {periods.map(({ label, value }) => (
              <option key={value} value={value} className=' text-xs'>
                {label} Winners
              </option>
            ))}
          </select>
        </div>
      </div>
      

      {loading && <p className="text-gray-500">Loading...</p>}
      

      {!loading && winners.length === 0 && (
        <div className="text-center py-20  text-lg overflow-auto   ">
             Winners will be updated shortly check back later <span role="img" aria-label="sad">😊</span>     
        </div>
      )}

      {winners.length > 0 && (
        <div className="overflow-x-auto border py-20  text-lg  rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-l from-blue-200 to-violet-200  ">
              <tr >
                <th className="px-6 py-3 text-center text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Won</th>
                <th className="px-6 py-3 text-center text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-center text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Ticket</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {winners.map((winner) => (
                <tr key={winner._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-500">
                    <Crown size={20} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{winner.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {winner.wonTicketType || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default WinnerList;
