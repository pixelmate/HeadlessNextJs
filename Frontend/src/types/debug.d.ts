import debug from 'debug';
export declare type Debugger = debug.Debugger;
/**
 * Enable debug logging dynamically
 * @param {string} namespaces space-separated list of namespaces to enable
 */
export declare const enableDebug: (namespaces: string) => void;
declare const _default: {
  http: debug.Debugger;
  layout: debug.Debugger;
  dictionary: debug.Debugger;
  editing: debug.Debugger;
  sitemap: debug.Debugger;
  multisite: debug.Debugger;
  robots: debug.Debugger;
  redirects: debug.Debugger;
  personalize: debug.Debugger;
  errorpages: debug.Debugger;
};
/**
 * Default Sitecore JSS 'debug' module debuggers. Uses namespace prefix 'sitecore-jss:'.
 * See {@link https://www.npmjs.com/package/debug} for details.
 */
export default _default;
