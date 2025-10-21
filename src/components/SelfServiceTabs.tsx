import { useEffect, useState } from 'react';
import { Smartphone, Bell, FileSpreadsheet, ArrowRight, Megaphone } from 'lucide-react';

const tabs = [
  {
    key: 'web_mobile',
    label: 'Web and Mobile app',
    tile: {
      title: 'Make payroll data accessible anywhere',
      image: 'https://ik.imagekit.io/vv/Frame%2011.svg?updatedAt=1761068810325',
      description:
        'Let employees download payslip, tax worksheets, and Form 16s at their convenience, using their web app and mobile, instantly.',
      icon: Smartphone,
      bg: 'bg-white',
      border: 'border border-gray-200',
      iconColor: 'text-emerald-600',
      badge: undefined,
    },
  },
  {
    key: 'instant_payslips',
    label: 'Instant Payslips',
    tile: {
      title: 'Notify as soon as you pay',
      image: 'https://ik.imagekit.io/vv/Frame%2012.svg?updatedAt=1761068810436',
      description:
        'Automatically send salary notifications and release payslips in real time.',
      icon: Bell,
      bg: 'bg-amber-200',
      border: '',
      iconColor: 'text-amber-700',
      badge: 'Salary Received',
    },
  },
  {
    key: 'digitisation',
    label: 'Digitisation',
    tile: {
      title: 'Digitise payroll operations',
      image: 'https://ik.imagekit.io/vv/Frame%2013.svg?updatedAt=1761068810348',
      description:
        'Collect reimbursement requests, IT declarations, and POI submissions online.',
      icon: FileSpreadsheet,
      bg: 'bg-white',
      border: 'border border-gray-200',
      iconColor: 'text-indigo-600',
      badge: undefined,
    },
  },
  {
    key: 'communication',
    label: 'Communication',
    tile: {
      title: 'Keep employees in the loop',
      image: 'https://ik.imagekit.io/vv/Frame%2014.svg?updatedAt=1761068810392',
      description:
        'Send targeted updates and confirmations to employees right from the portal.',
      icon: Megaphone,
      bg: 'bg-white',
      border: 'border border-gray-200',
      iconColor: 'text-blue-600',
      badge: undefined,
    },
  },
];

export default function SelfServiceTabs() {
  const [active, setActive] = useState(1); // default to Instant Payslips

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeTab = tabs[active];
  const Icon = activeTab.tile.icon;
  const nextIndex = (active + 1) % tabs.length;
  const nextTab = tabs[nextIndex];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="uppercase tracking-wide text-rose-400 text-xs font-semibold mb-2">
            Intuitive Employee Portal
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Self-service tools you and your employees will love
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 text-sm">
          {tabs.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(i)}
                className={`px-2 pb-2 transition-colors ${
                  isActive
                    ? 'text-gray-900 font-semibold border-b-2 border-red-500'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Active tile with 30% next-slide peek */}
        <div className="mt-10 overflow-hidden">
          <div className="flex gap-6 max-w-6xl mx-auto">
            {/* Active (70%) */}
            <div className='bg-white shadow-lg rounded-xl p-8 relative w-[70%] shrink-0'>
              <div className="flex items-center gap-8">
                {/* <Icon className={`w-8 h-8 ${activeTab.tile.iconColor} flex-shrink-0`} /> */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1 max-w-[300px]">{activeTab.tile.title}</h3>
                  <p className="text-gray-700">{activeTab.tile.description}</p>
                </div>
                <div>
                  <img className='max-h-[400px]' src={activeTab.tile.image} alt="" />
                </div>
              </div>
            </div>

            {/* Next peek (30%) */}
            <button
              onClick={() => setActive(nextIndex)}
              aria-label={`View ${nextTab.label}`}
              className="h-full shrink-0"
            >
              <div className="h-full bg-white shadow rounded-xl p-6 relative overflow-hidden opacity-85 hover:opacity-100 transition">
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold shadow text-gray-700">
                  Next
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{nextTab.tile.title}</h4>
                    <p className="text-sm text-gray-600">{nextTab.tile.description}</p>
                    <div className="mt-3 inline-flex items-center text-gray-800 font-medium">
                      <span>See more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <img className='max-h-[160px] mx-auto' src={nextTab.tile.image} alt="" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}