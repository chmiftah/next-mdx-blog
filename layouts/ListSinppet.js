import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import formatDate from '@/lib/utils/formatDate';
import TagSnippet from '@/components/TagSnippet';

export default function ListSnippet({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-zinc-800 dark:text-white md:text-5xl">
          {title}
        </h1>
        <div className="relative ">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className=''>
        <ul className='lg:grid lg:grid-cols-2 w-full gap-x-4 gap-y-4  '>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="hover:bg-gray-100 dark:hover:bg-black  p-4 mb-4 rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700 ">
                <article className="space-y-2 xl:items-baseline xl:space-y-0   ">
                  <div className="space-y-4 xl:col-span-3">
                    <Link href={`/snippet/${slug}`} className="text-gray-900 dark:text-gray-100 ">
                      <div>
                        <div>
                          <img src="https://leerob.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F56a8ffnw%2Fproduction%2Fb783b41e12872fbdec485b265adcce1940e2f34f-100x100.png%3Ffit%3Dmax%26auto%3Dformat&w=32&q=75" alt="" />
                        </div>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <TagSnippet className="" key={tag} text={tag} />
                          ))}
                        </div>
                        <div className="prose text-lg max-w-none text-gray-700 dark:text-gray-400">{summary}</div>
                      </div>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {
        pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )
      }
    </>
  );
}
