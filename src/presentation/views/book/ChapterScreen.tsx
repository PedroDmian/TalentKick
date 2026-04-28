import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RenderHTML from 'react-native-render-html';

import { INavigationProps } from '../../../domain/models/INavigation';

import Button from '../../components/Button';

const htmlContent = `
  <div class="ac cb">
  <div class="ci bh gv gw gx gy">
    <figure class="no np nq nr ns nt nl nm paragraph-image">
      <div role="button" tabindex="0" class="nu nv ee nw bh nx">
        <div class="nl nm nn">
          <picture>
            <source
              srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/0*77tyTjiPlQknRxJL 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/0*77tyTjiPlQknRxJL 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/0*77tyTjiPlQknRxJL 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/0*77tyTjiPlQknRxJL 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/0*77tyTjiPlQknRxJL 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/0*77tyTjiPlQknRxJL 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/0*77tyTjiPlQknRxJL 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
              type="image/webp">
            <source data-testid="og"
              srcset="https://miro.medium.com/v2/resize:fit:640/0*77tyTjiPlQknRxJL 640w, https://miro.medium.com/v2/resize:fit:720/0*77tyTjiPlQknRxJL 720w, https://miro.medium.com/v2/resize:fit:750/0*77tyTjiPlQknRxJL 750w, https://miro.medium.com/v2/resize:fit:786/0*77tyTjiPlQknRxJL 786w, https://miro.medium.com/v2/resize:fit:828/0*77tyTjiPlQknRxJL 828w, https://miro.medium.com/v2/resize:fit:1100/0*77tyTjiPlQknRxJL 1100w, https://miro.medium.com/v2/resize:fit:1400/0*77tyTjiPlQknRxJL 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px">
            <img alt="" class="bh er ny c" width="700" height="466" loading="eager" role="presentation"
              src="https://miro.medium.com/v2/resize:fit:1400/0*77tyTjiPlQknRxJL">
          </picture>
        </div>
      </div>
      <figcaption class="nz oa ob nl nm oc od bf b bg ab dx" data-selectable-paragraph="">Photo by <a class="ag oe"
          href="https://unsplash.com/@pete_2112?utm_source=medium&amp;utm_medium=referral" rel="noopener ugc nofollow"
          target="_blank">Pete F</a> on <a class="ag oe"
          href="https://unsplash.com/?utm_source=medium&amp;utm_medium=referral" rel="noopener ugc nofollow"
          target="_blank">Unsplash</a></figcaption>
    </figure>
    <p id="5b9b"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph=""><strong class="oh hp">Did you read about Html? 🥳</strong></p>
    <p id="97f9"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">It really has many features to learn.</p>
    <p id="b980"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">Html is the base of web development. Every web developer already knows that. In this
      article I want to tell something different.</p>
    <p id="4757"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph=""><a class="ag oe" rel="noopener"
        href="/developers-corner/5-html-tips-probably-you-dont-know-3dc68d9b5214?sk=45aeb1305a02dc88017d86034b585cce"
        data-discover="true"><strong class="oh hp">If you are not a member, you can access to full text
          here.</strong></a></p>
    <p id="c9fb"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">Most of developer focus on real languages like js, php or node.js like me. As the
      years passed, I decided to further deepen my knowledge.</p>
    <p id="7da9"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">So I read and learn daily. Let’s find out together what features html has.</p>
    <h1 id="20bd" class="oy oz ho bf pa pb pc io fg pd pe ir fj pf pg ph pi pj pk pl pm pn po pp pq pr bk"
      data-selectable-paragraph="">1. Capture Attribute</h1>
    <figure class="no np nq nr ns nt nl nm paragraph-image">
      <div role="button" tabindex="0" class="nu nv ee nw bh nx">
        <div class="nl nm ps">
          <picture>
            <source
              srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gr_Zq9s2VhWjy_pimFkV7Q.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
              type="image/webp">
            <source data-testid="og"
              srcset="https://miro.medium.com/v2/resize:fit:640/1*gr_Zq9s2VhWjy_pimFkV7Q.png 640w, https://miro.medium.com/v2/resize:fit:720/1*gr_Zq9s2VhWjy_pimFkV7Q.png 720w, https://miro.medium.com/v2/resize:fit:750/1*gr_Zq9s2VhWjy_pimFkV7Q.png 750w, https://miro.medium.com/v2/resize:fit:786/1*gr_Zq9s2VhWjy_pimFkV7Q.png 786w, https://miro.medium.com/v2/resize:fit:828/1*gr_Zq9s2VhWjy_pimFkV7Q.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*gr_Zq9s2VhWjy_pimFkV7Q.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*gr_Zq9s2VhWjy_pimFkV7Q.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px">
            <img alt="Capture attribute" class="bh er ny c" width="700" height="281" loading="lazy"
              src="https://miro.medium.com/v2/resize:fit:1400/1*gr_Zq9s2VhWjy_pimFkV7Q.png">
          </picture>
        </div>
      </div>
      <figcaption class="nz oa ob nl nm oc od bf b bg ab dx" data-selectable-paragraph=""><strong class="bf pa">Capture
          attribute</strong></figcaption>
    </figure>
    <p id="a8e4"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">It is used to determine which source to use when receiving media (photo, video,
      audio) files from the user.</p>
    <p id="d1d3"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">It is usually used with the input element and its value allows the user to capture
      content directly by opening their device’s camera, microphone or other media source.</p>
    <p id="b428"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph=""><mark class="zw zx ap">It takes two value to control input. ‘capture:user’ uses the
        user’s front camera or micro as an input. ‘capture:environment’ uses the user’s back camera to capture input
        data.</mark></p>
    <h1 id="7797" class="oy oz ho bf pa pb pc io fg pd pe ir fj pf pg ph pi pj pk pl pm pn po pp pq pr bk"
      data-selectable-paragraph="">2. Auto Refresh</h1>
    <figure class="no np nq nr ns nt nl nm paragraph-image">
      <div role="button" tabindex="0" class="nu nv ee nw bh nx">
        <div class="nl nm pt">
          <picture>
            <source
              srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GPPfg4-KmlKdTyQqDaJ_lw.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
              type="image/webp">
            <source data-testid="og"
              srcset="https://miro.medium.com/v2/resize:fit:640/1*GPPfg4-KmlKdTyQqDaJ_lw.png 640w, https://miro.medium.com/v2/resize:fit:720/1*GPPfg4-KmlKdTyQqDaJ_lw.png 720w, https://miro.medium.com/v2/resize:fit:750/1*GPPfg4-KmlKdTyQqDaJ_lw.png 750w, https://miro.medium.com/v2/resize:fit:786/1*GPPfg4-KmlKdTyQqDaJ_lw.png 786w, https://miro.medium.com/v2/resize:fit:828/1*GPPfg4-KmlKdTyQqDaJ_lw.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*GPPfg4-KmlKdTyQqDaJ_lw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*GPPfg4-KmlKdTyQqDaJ_lw.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px">
            <img alt="Auto Refresh" class="bh er ny c" width="700" height="300" loading="lazy"
              src="https://miro.medium.com/v2/resize:fit:1400/1*GPPfg4-KmlKdTyQqDaJ_lw.png">
          </picture>
        </div>
      </div>
      <figcaption class="nz oa ob nl nm oc od bf b bg ab dx" data-selectable-paragraph=""><strong class="bf pa">Auto
          Refresh</strong></figcaption>
    </figure>
    <p id="9707"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph=""><mark class="zw zx ap">You can set your website to refresh after a given amount of
        time from the head tag. You just need to set up that in the head tag.</mark> The code above refreshes page every
      10 seconds.</p>
    <h1 id="e2ce" class="oy oz ho bf pa pb pc io fg pd pe ir fj pf pg ph pi pj pk pl pm pn po pp pq pr bk"
      data-selectable-paragraph="">3. Active Spell Check</h1>
    <figure class="no np nq nr ns nt nl nm paragraph-image">
      <div role="button" tabindex="0" class="nu nv ee nw bh nx">
        <div class="nl nm pt">
          <picture>
            <source
              srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5aqR5OhgXDEtAy2oDB4CWw.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
              type="image/webp">
            <source data-testid="og"
              srcset="https://miro.medium.com/v2/resize:fit:640/1*5aqR5OhgXDEtAy2oDB4CWw.png 640w, https://miro.medium.com/v2/resize:fit:720/1*5aqR5OhgXDEtAy2oDB4CWw.png 720w, https://miro.medium.com/v2/resize:fit:750/1*5aqR5OhgXDEtAy2oDB4CWw.png 750w, https://miro.medium.com/v2/resize:fit:786/1*5aqR5OhgXDEtAy2oDB4CWw.png 786w, https://miro.medium.com/v2/resize:fit:828/1*5aqR5OhgXDEtAy2oDB4CWw.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*5aqR5OhgXDEtAy2oDB4CWw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*5aqR5OhgXDEtAy2oDB4CWw.png 1400w"
              sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px">
            <img alt="Active Spell Check" class="bh er ny c" width="700" height="260" loading="lazy"
              src="https://miro.medium.com/v2/resize:fit:1400/1*5aqR5OhgXDEtAy2oDB4CWw.png">
          </picture>
        </div>
      </div>
      <figcaption class="nz oa ob nl nm oc od bf b bg ab dx" data-selectable-paragraph=""><strong class="bf pa">Active
          Spell Check</strong></figcaption>
    </figure>
    <p id="6ee2"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph="">You can use the HTML spellcheck attribute and set it to true to active it. Specify
      the language to be used using the lang attribute.</p>
    <p id="650b"
      class="pw-post-body-paragraph of og ho oh b im oi oj ok ip ol om on fk oo op oq fn or os ot fq ou ov ow ox gp bk"
      data-selectable-paragraph=""><mark class="zw zx ap">It is a standard attribute and it is supported by most
        browsers like Google, Mozilla.</mark></p>
    <h1 id="f8e1" class="oy oz ho bf pa pb pc io fg pd pe ir fj pf pg ph pi pj pk pl pm pn po pp pq pr bk"
      data-selectable-paragraph="">4. Specify File Type to Be Uploaded</h1>
  </div>
</div>
`

const ChapterScreen = ({ navigation }: INavigationProps) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
     <View className='flex-1 bg-dark justify-start w-full'>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps={'never'}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View 
          className='absolute left-5 z-10' 
          style={{ top: Math.max(insets.top, 20) }}
        >
          <Button 
            icon={<IconFontAwesome5 name='chevron-left' size={25} color={'white'}/>}
            onPress={() => navigation.goBack()}
            styleType={'trasparent'}
            classNameTouch='px-2 py-1'
          />
        </View>

        <Text 
          className='text-white text-4xl text-center font-monaBold tracking-widest'
          style={{ marginTop: Math.max(insets.top + 40, 80) }}
        >
          Lorem ipsum
        </Text>

        <View className='w-full h-full flex-1'>
          
          <View className='flex-1 px-4 py-6'>
            <RenderHTML
              contentWidth={width}
              source={{ html: htmlContent }}
              tagsStyles={{
                p: { 
                  fontSize: 15,
                  color: '#fff',
                  lineHeight: 28,
                  textAlign: 'justify',
                },
                h1: {
                  fontSize: 28,
                  fontWeight: 'bold'
                },
                strong: { 
                  color: '#f9f9f9',
                  fontWeight: 'bold'
                }
              }}
            />
          </View>

        </View>
      </KeyboardAwareScrollView>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
  },
});

export default ChapterScreen;