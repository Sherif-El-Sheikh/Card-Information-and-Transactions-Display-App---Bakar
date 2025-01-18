import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  ChevronUp,
  ChevronDown,
  CreditCard,
  Calendar,
  Lock,
  CreditCardIcon,
  Building2,
  User,
  CheckCircle2,
  Circle,
  Wallet,
  Clock,
  MapPin,
  CirclePause,
  RefreshCw,
  CircleX,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { CardData } from '@/types/card';
import visaLogo from '../assets/visa.png';
import visaLogoCard from '../assets/visaLogoCard.png';
import visaBrand from '../assets/visaBrand.png';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

export default function CardInfo() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [showCVC, setShowCVC] = useState(false);
  const [cvvTimer, setCvvTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    // Card data from API
    fetch("https://www.bakarcompany.somee.com/api/IssueCard/get-card-data")
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
        setLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  // Toggles the visibility of the CVC
  const toggleCVC = () => {
    if (!showCVC) {
      setShowCVC(true);
      // Auto-hide CVV after 10 seconds
      const timer = setTimeout(() => {
        setShowCVC(false);
        toast.info("CVV hidden for security", {
          style: { background: "#4b5563", color: "white" },
        });
      }, 10000);

      setCvvTimer(timer);
    } else {
      setShowCVC(false);
      if (cvvTimer) {
        clearTimeout(cvvTimer);
      }
    }
  };

  // Cleanup the timer when the component unmounts or when the cvvTimer state changes
  useEffect(() => {
    return () => {
      if (cvvTimer) {
        clearTimeout(cvvTimer);
      }
    };
  }, [cvvTimer]);

  // Format Cardholder Name With Spaces between
  const cardholderName = cardData?.cardholderName;
  const formattedName = cardholderName? cardholderName.replace(/([a-z])([A-Z])/g, "$1 $2") : "";

  const handleFreeze = () => {
    toast.success("Card frozen successfully", {
      style: { background: "#20b1e0", color: "white" },
    });
  };

  const handleCancel = () => {
    toast.success("Card cancelled successfully", {
      style: { background: "#dc5387", color: "white" },
    });
  };

  const handleReplace = () => {
    toast.success("Card replacement requested", {
      style: { background: "#ffd25d", color: "black" },
    });
  };

  // loading spinner
  if (pageLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#dc5387]"></div>
      </div>
    );
  }

  // skeleton loaders
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pt-9">
        <Skeleton className="h-[60px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
       {/* page title */}
      <Helmet>
        <title>Card Info - Card Info and Transaction Tracker</title>
      </Helmet>

      {/* card type and cardholder */}
      <div className="flex items-center space-x-2">
        <CreditCard className="h-6 w-6" />
        <h1 className="text-lg sm:text-xl font-bold">Card Details</h1>
      </div>
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        <img
          src={visaLogo}
          alt="Visa Logo"
          className="h-8 sm:h-12 object-contain"
        />

        <div className="flex-1">
          <div className="font-medium text-sm sm:text-base">
            {formattedName}
          </div>
        </div>

        <div className="flex flex-col">
          <Button className="p-2 bg-transparent outline-none shadow-none hover:bg-gray-100 hover:border-transparent h-6 mb-1 focus:outline-none focus:border-none">
            <ChevronUp className="w-4 h-6 mb-1 text-black" />
          </Button>
          <Button className="p-2 bg-transparent outline-none shadow-none hover:bg-gray-100 hover:border-transparent h-6 focus:outline-none focus:border-none">
            <ChevronDown className="w-4 h-6 text-black" />
          </Button>
        </div>
      </div>

      {/* Card visualization */}
      <Card className="relative overflow-hidden p-5 sm:p-8 bg-gradient-to-br from-[#a11a3a] via-[#743370] to-[#1e61d4] text-white">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <CreditCard className="w-8 sm:w-10 h-10" />
            <img
              src={visaLogoCard}
              alt="Visa Logo"
              className="h-5 sm:h-6 object-contain"
            />
          </div>
          {/* Card Number (last 4) */}
          <div>
            <div className="text-base sm:text-3xl tracking-[4px] font-mono">
              •••• •••• •••• {cardData?.last4}
            </div>
          </div>

          <div className="flex justify-between items-end">
          {/* Card Holder */}
            <div>
              <div className="text-sm opacity-75">Card Holder</div>
              <div className="font-medium text-xs sm:text-base">
                {formattedName}
              </div>
            </div>
            {/* Expiration Date */}
            <div className="text-center sm:text-right">
              <div className="text-sm opacity-75">Expires</div>
              {/* Formats Expiration Date (MM/YY) */}
              <div className="font-medium text-xs sm:text-base">
                {String(cardData?.expiryMonth).padStart(2, "0")}/
                {String(cardData?.expiryYear).slice(-2)}
              </div>
            </div>
            {/* CVV */}
            <div className=" text-center sm:text-right">
              <div className="text-sm opacity-75">CVV</div>
              <div className="font-medium text-xs sm:text-base">
                {showCVC ? cardData?.cvc : "•••"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Card details */}
      <Card className="p-3 md:p-6">
        <div className="space-y-6">
          <div className="grid gap-6">

          {/* Card Number (last 4) */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#de0c0c]/10 rounded-full">
                    <CreditCardIcon className="w-5 h-5 text-[#de0c0c]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Card Number
                  </div>
                </div>
              </div>

              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base">
                  •••• •••• •••• {cardData?.last4}
                </div>
              </div>
            </div>

            {/* CVV */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#20b1e0]/10 rounded-full">
                    <Lock className="w-5 h-5 text-[#20b1e0]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">CVV</div>
                </div>
              </div>

              <div className=" col-span-6 flex items-center gap-3">
                <div className="font-medium text-sm sm:text-base">
                  {showCVC ? cardData?.cvc : "•••"}
                </div>
                {/* Toggles visibility of CVV */}
                <div className={`font-medium text-xs sm:text-base cvv-reveal ${showCVC ? "revealed" : ""}`} onClick={toggleCVC}>
                  <span className="cvv-icon">
                    {showCVC ?
                    (<EyeOff className="h-4 w-4" />)
                    :
                    (<Eye className="h-4 w-4" />)
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Expiration Date */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#dc5387]/10 rounded-full">
                    <Calendar className="w-5 h-5 text-[#dc5387]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Expiration
                  </div>
                </div>
              </div>
              
              <div className=" col-span-6">
              {/* Formats Expiration Date (MM/YYY) */}
                <div className="font-medium text-sm sm:text-base">
                  {String(cardData?.expiryMonth).padStart(2, "0")}/{cardData?.expiryYear}
                </div>
              </div>
            </div>

            {/* Card Brand */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#ffd25d]/10 rounded-full">
                    <Building2 className="w-5 h-5 text-[#ffd25d]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Brand
                  </div>
                </div>
              </div>
              
              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base flex gap-5 items-center">
                  {cardData?.brand}
                  <img
                    src={visaBrand}
                    alt="Visa Logo"
                    className=" h-8 sm:h-9 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Card Status */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className="col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Circle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Status
                  </div>
                </div>
              </div>
              
              <div className="col-span-6">
                <div className="font-medium text-sm sm:text-base flex items-center text-green-600 px-3 py-1 rounded-md bg-green-50 w-fit">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  Active
                </div>
              </div>
            </div>

            {/* Card Holder */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#0d2d95]/10 rounded-full">
                    <User className="w-5 h-5 text-[#0d2d95]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Cardholder
                  </div>
                </div>
              </div>
              
              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base">
                  {formattedName}
                </div>
              </div>
            </div>

            {/* Card Type */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#8930e1]/10 rounded-full">
                    <Wallet className="w-5 h-5 text-[#8930e1]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Card type
                  </div>
                </div>
              </div>
              
              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base">Virtual</div>
              </div>
            </div>

            {/* Card Creation Date */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#a11a3a]/10 rounded-full">
                    <Clock className="w-5 h-5 text-[#a11a3a]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Created at
                  </div>
                </div>
              </div>
              
              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base">
                  Nov 15, 2023, 9:32 PM
                </div>
              </div>
            </div>

            {/* Cardholder Billing Address */}
            <div className="grid grid-cols-12 items-center gap-5">
              <div className=" col-span-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-2 bg-[#343f24]/10 rounded-full">
                    <MapPin className="w-5 h-5 text-[#343f24]" />
                  </div>
                  <div className="text-xs sm:text-base text-gray-900">
                    Billing address
                  </div>
                </div>
              </div>

              <div className=" col-span-6">
                <div className="font-medium text-sm sm:text-base">
                  123 Main Street
                </div>
                <div className="text-xs sm:text-sm text-gray-900">
                  San Francisco, CA, 94111, US
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Card Actions */}
      <div className="space-y-4">
        <Button
          onClick={handleFreeze}
          variant="outline"
          className="w-full py-6 text-lg hover:bg-[#20b1e0] hover:text-white hover:border-none">
          <CirclePause className="w-5 h-5 mr-2" />
          Freeze Card
        </Button>

        <Button
          onClick={handleReplace}
          variant="outline"
          className="w-full py-6 text-lg hover:bg-[#ffd25d] hover:border-none">
          <RefreshCw className="w-5 h-5 mr-2" />
          Replace Card
        </Button>

        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full py-6 text-lg text-destructive hover:bg-[#dc5387] hover:text-white hover:border-none">
          <CircleX className="w-5 h-5 mr-2" />
          Cancel Card
        </Button>
      </div>
    </div>
  );
}