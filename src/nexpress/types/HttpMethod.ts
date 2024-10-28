const METHODS = [
    'ACL',        'BIND',        'CHECKOUT',
    'CONNECT',    'COPY',        'DELETE',
    'GET',        'HEAD',        'LINK',
    'LOCK',       'M-SEARCH',    'MERGE',
    'MKACTIVITY', 'MKCALENDAR',  'MKCOL',
    'MOVE',       'NOTIFY',      'OPTIONS',
    'PATCH',      'POST',        'PROPFIND',
    'PROPPATCH',  'PURGE',       'PUT',
    'QUERY',      'REBIND',      'REPORT',
    'SEARCH',     'SOURCE',      'SUBSCRIBE',
    'TRACE',      'UNBIND',      'UNLINK',
    'UNLOCK',     'UNSUBSCRIBE'
] as const;

type HttpMethod = typeof METHODS[number] | "ALL";

export default HttpMethod;