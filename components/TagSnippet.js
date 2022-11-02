import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const TagSnippet = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-2xl font-semibold  text-gray-700 dark:text-gray-100 dark:hover:text-gray-200">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default TagSnippet
