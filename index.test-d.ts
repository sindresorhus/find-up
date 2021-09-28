import {expectType, expectError} from 'tsd';
import {findUp, findUpSync, findUpMultiple, findUpMultipleSync, findUpStop, pathExists, pathExistsSync} from './index.js';

expectType<Promise<string | undefined>>(findUp('unicorn.png'));
expectType<Promise<string | undefined>>(findUp('unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png']));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(['rainbow.png', 'unicorn.png'], {stopAt: 'foo'}));
expectError(findUp(['rainbow.png', 'unicorn.png'], {concurrency: 1}));

expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(() => 'unicorn.png', {stopAt: 'foo'}));
expectType<Promise<string | undefined>>(findUp(() => undefined));
expectType<Promise<string | undefined>>(findUp(() => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(() => undefined, {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(() => undefined, {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(() => undefined, {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(() => undefined, {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(() => undefined, {stopAt: 'foo'}));
expectType<Promise<string | undefined>>(findUp((): typeof findUpStop => findUpStop));
expectType<Promise<string | undefined>>(findUp((): typeof findUpStop => findUpStop, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp((): typeof findUpStop => findUpStop, {stopAt: 'foo'}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png'));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(async () => 'unicorn.png', {stopAt: 'foo'}));
expectType<Promise<string | undefined>>(findUp(async () => undefined));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(async () => undefined, {stopAt: 'foo'}));

expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {cwd: ''}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {allowSymlinks: true}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {allowSymlinks: false}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {type: 'file'}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {type: 'directory'}));
expectType<Promise<string | undefined>>(findUp(async (): Promise<typeof findUpStop> => findUpStop, {stopAt: 'foo'}));

expectType<Promise<string[] | undefined>>(findUpMultiple('unicorn.png'));
expectType<Promise<string[] | undefined>>(findUpMultiple('unicorn.png', {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png']));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(['rainbow.png', 'unicorn.png'], {stopAt: 'foo'}));
expectError(findUpMultiple(['rainbow.png', 'unicorn.png'], {concurrency: 1}));

expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png'));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => 'unicorn.png', {stopAt: 'foo'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(() => undefined, {stopAt: 'foo'}));
expectType<Promise<string[] | undefined>>(findUpMultiple((): typeof findUpStop => findUpStop));
expectType<Promise<string[] | undefined>>(findUpMultiple((): typeof findUpStop => findUpStop, {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple((): typeof findUpStop => findUpStop, {stopAt: 'foo'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png'));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => 'unicorn.png', {stopAt: 'foo'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async () => undefined, {stopAt: 'foo'}));

expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {cwd: ''}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {allowSymlinks: true}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {allowSymlinks: false}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {type: 'file'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {type: 'directory'}));
expectType<Promise<string[] | undefined>>(findUpMultiple(async (): Promise<typeof findUpStop> => findUpStop, {stopAt: 'foo'}));

expectType<string | undefined>(findUpSync('unicorn.png'));
expectType<string | undefined>(findUpSync('unicorn.png', {cwd: ''}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png']));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {type: 'directory'}));
expectType<string | undefined>(findUpSync(['rainbow.png', 'unicorn.png'], {stopAt: 'foo'}));

expectType<string | undefined>(findUpSync(() => 'unicorn.png'));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {cwd: ''}));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {allowSymlinks: true}));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {allowSymlinks: false}));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {type: 'file'}));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {type: 'directory'}));
expectType<string | undefined>(findUpSync(() => 'unicorn.png', {stopAt: 'foo'}));
expectType<string | undefined>(findUpSync(() => undefined));
expectType<string | undefined>(findUpSync(() => undefined, {cwd: ''}));
expectType<string | undefined>(findUpSync(() => undefined, {allowSymlinks: true}));
expectType<string | undefined>(findUpSync(() => undefined, {allowSymlinks: false}));
expectType<string | undefined>(findUpSync(() => undefined, {type: 'file'}));
expectType<string | undefined>(findUpSync(() => undefined, {type: 'directory'}));
expectType<string | undefined>(findUpSync(() => undefined, {stopAt: 'foo'}));
expectType<string | undefined>(findUpSync((): typeof findUpStop => findUpStop));
expectType<string | undefined>(findUpSync((): typeof findUpStop => findUpStop, {cwd: ''}));
expectType<string | undefined>(findUpSync((): typeof findUpStop => findUpStop, {type: 'file'}));
expectType<string | undefined>(findUpSync((): typeof findUpStop => findUpStop, {type: 'directory'}));
expectType<string | undefined>(findUpSync((): typeof findUpStop => findUpStop, {stopAt: 'foo'}));

expectType<string[] | undefined>(findUpMultipleSync('unicorn.png'));
expectType<string[] | undefined>(findUpMultipleSync('unicorn.png', {cwd: ''}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png']));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {cwd: ''}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {allowSymlinks: true}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {allowSymlinks: false}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {type: 'file'}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {type: 'directory'}));
expectType<string[] | undefined>(findUpMultipleSync(['rainbow.png', 'unicorn.png'], {stopAt: 'foo'}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png'));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {cwd: ''}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {allowSymlinks: true}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {allowSymlinks: false}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {type: 'file'}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {type: 'directory'}));
expectType<string[] | undefined>(findUpMultipleSync(() => 'unicorn.png', {stopAt: 'foo'}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {cwd: ''}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {allowSymlinks: true}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {allowSymlinks: false}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {type: 'file'}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {type: 'directory'}));
expectType<string[] | undefined>(findUpMultipleSync(() => undefined, {stopAt: 'foo'}));
expectType<string[] | undefined>(findUpMultipleSync((): typeof findUpStop => findUpStop));
expectType<string[] | undefined>(findUpMultipleSync((): typeof findUpStop => findUpStop, {cwd: ''}));
expectType<string[] | undefined>(findUpMultipleSync((): typeof findUpStop => findUpStop, {type: 'file'}));
expectType<string[] | undefined>(findUpMultipleSync((): typeof findUpStop => findUpStop, {type: 'directory'}));
expectType<string[] | undefined>(findUpMultipleSync((): typeof findUpStop => findUpStop, {stopAt: 'foo'}));

expectType<Promise<boolean>>(pathExists('unicorn.png'));
expectType<boolean>(pathExistsSync('unicorn.png'));
