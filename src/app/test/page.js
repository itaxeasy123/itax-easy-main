import DashSection from '@/components/pagesComponents/pageLayout/DashSection';

export default function page() {
  // // for year 23-24 old regime indivudual
  const nexttaxablevalue = (salary) => {
    let taxablevalue = 0;

    if (salary <= 250000) {
      taxablevalue = 0; // Nil
    } else if (salary <= 500000) {
      taxablevalue = (salary - 250000) * 0.05; // 5% for the amount above 250,000
    } else if (salary <= 1000000) {
      taxablevalue = (salary - 500000) * 0.2 + 12500; // 20% for the amount above 500,000
    } else {
      taxablevalue = (salary - 1000000) * 0.3 + 112500; // 30% for the amount above 1,000,000
    }

    return taxablevalue;
  };

  console.log(nexttaxablevalue(1000000)); // Output will be 112500

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-3 items-end">
        <div className="heading-1">heading</div>
        <div className="heading-2">heading</div>
        <div className="heading-3">heading</div>
        <div className="heading-4">heading</div>
        <div className="heading-5">heading</div>
        <div className="heading-6">heading</div>
      </div>
      <div className=" space-y-4 space-x-4">
        <button className="btn-secondary">Button</button>
        <button className="btn-success">Login</button>
        <button className="btn-danger">Signup</button>
        <button className="btn-warning">Save PDF</button>
        <button className="btn-primary">Download PDF</button>
        <button className="btn-light">Download Invoice</button>
        <button className="btn-dark">Download Invoice</button>
        <button className="btn-info">
          <span className="spinner"></span>
          Loading...
        </button>
      </div>
      <p className="paragraph-xs">
        Placeholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes.
      </p>
      <p className="paragraph-sm">
        Placeholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes
      </p>
      <p className="paragraph-md">
        Placeholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes.
      </p>
      <p className="paragraph-lg">
        Placeholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes
      </p>
      <p className="paragraph-xl">
        TPlaceholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes
      </p>
      <p className="paragraph-2xl">
        Placeholders can be used to enhance the experience of your application.{' '}
        {"They're"} built only with HTML and CSS, meaning you {"don't"} need any
        JavaScript to create them. You will, however, need some custom
        JavaScript to toggle their visibility. Their appearance, color, and
        sizing can be easily customized with our utility classes
      </p>

      <DashSection title="Test" titleRight="sub Test">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
      </DashSection>

      <div className="grid lg:grid-cols-2">
        <div>
          <h1 className="p-2 font-extrabold lg:text-5xl text-4xl">page Name</h1>
          <form action="">
            <input type="text" />
            <button
              className="inline-block px-6 py-2 rounded-md text-neutral-50 bg-blue-500 hover:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p class="text-2xl text-gray-400 dark:text-gray-500">
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
