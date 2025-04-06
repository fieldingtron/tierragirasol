import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full  border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-8 px-4 flex flex-col items-center justify-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
        <div>&copy; {new Date().getFullYear()} Tierra  Girasol</div>

        <a
          href="https://www.instagram.com/tierra.girasol/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 mx-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75z"/>
          </svg>
        </a>  


       <a
          href="https://fieldsmarshall.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        > Diseño - Fields Marshall
        </a>
      </div>
     




    </footer>
  );
}
