import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import Header from '../components/commonComponent/Header';
import Footer from '../components/commonComponent/Footer';

export const PurchaseCancel = () => {
  const [searchParams] = useSearchParams();
  const txnid = searchParams.get('txnid');
  const errorMessage = searchParams.get('error_Message');
  const status = searchParams.get('status');

  return (
    <div className='min-h-screen bg-gradient-to-b from-red-50 to-white'>
      <Header />
      
      <div className='container mx-auto px-4 py-20 flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden'
        >
          <div className='p-8 sm:p-12'>
            {/* Error Icon */}
            <div className='flex justify-center mb-6'>
              <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
                <XCircle className='text-red-500 w-16 h-16' />
              </div>
            </div>

            {/* Title */}
            <h1 className='text-3xl sm:text-4xl font-bold text-center text-red-600 mb-4'>
              Payment Failed
            </h1>

            {/* Description */}
            <p className='text-gray-600 text-center text-lg mb-6'>
              Your payment could not be processed. No charges have been made to your account.
            </p>

            {/* Error Details */}
            {(txnid || errorMessage || status) && (
              <div className='bg-red-50 border border-red-200 rounded-xl p-6 mb-6'>
                <h3 className='font-semibold text-red-800 mb-3'>Transaction Details:</h3>
                <div className='space-y-2 text-sm'>
                  {txnid && (
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Transaction ID:</span>
                      <span className='font-mono text-gray-800'>#{txnid.slice(-8).toUpperCase()}</span>
                    </div>
                  )}
                  {status && (
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Status:</span>
                      <span className='font-semibold text-red-600'>{status}</span>
                    </div>
                  )}
                  {errorMessage && (
                    <div className='mt-3 pt-3 border-t border-red-200'>
                      <p className='text-red-700'><strong>Error:</strong> {errorMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Support Info */}
            <div className='bg-gray-50 rounded-xl p-6 mb-8'>
              <p className='text-sm text-gray-700 text-center'>
                If you encountered any issues during the checkout process or if money was deducted from your account, 
                please contact our support team with your transaction ID.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              <Link
                to="/cart"
                className='flex-1 bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center shadow-lg'
              >
                <RefreshCcw className='mr-2' size={20} />
                Try Again
              </Link>
              <Link
                to="/"
                className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center'
              >
                <ArrowLeft className='mr-2' size={20} />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};
