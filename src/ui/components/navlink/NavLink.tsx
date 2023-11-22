import { LinkProps, Link as MuiLink } from '@mui/material';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ForwardedRef, forwardRef } from 'react';
// Defining the CustomNextLink
export type CustomNextLinkProps = Omit<NextLinkProps, 'href'> & {
  _href: NextLinkProps['href'];
};
export const CustomNextLink = forwardRef(
  (
    { _href, ...props }: CustomNextLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return <NextLink href={_href} {...props} ref={ref} />;
  }
);
// combine MUI LinkProps with NextLinkProps
type CombinedLinkProps = LinkProps<typeof NextLink>;
// remove both href properties
// and define a new href property using NextLinkProps
type NavLinkProps = Omit<CombinedLinkProps, 'href'> & {
  href: NextLinkProps['href'];
};
const NavLink = forwardRef(
  ({ href, ...props }: NavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    // use _href props of CustomNextLink to set the href
    return (
      <MuiLink {...props} component={CustomNextLink} _href={href} ref={ref} />
    );
  }
);
export default NavLink;
